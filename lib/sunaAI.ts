// Suna AI 客户端库

export interface GenerateStoryParams {
  prompt: string;
  ageGroup: string;
  language: string;
  pageCount: number;
}

export interface GenerateImageParams {
  prompt: string;
  style?: string;
  size?: string;
}

export interface GenerateAudioParams {
  text: string;
  voice?: string;
  language?: string;
}

export interface SunaAIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

class SunaAIClient {
  private baseUrl = '/api/suna-proxy';

  private async makeRequest<T>(action: string, params: any): Promise<SunaAIResponse<T>> {
    try {
      // 获取用户token
      const token = localStorage.getItem('supabase.auth.token');
      
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          action,
          ...params,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Suna AI ${action} error:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async generateStory(params: GenerateStoryParams) {
    return this.makeRequest<{
      pages: Array<{
        pageNumber: number;
        text: string;
        imagePrompt: string;
      }>;
      title: string;
      summary: string;
    }>('generate_story', params);
  }

  async generateImage(params: GenerateImageParams) {
    return this.makeRequest<{
      imageUrl: string;
      prompt: string;
    }>('generate_image', params);
  }

  async generateAudio(params: GenerateAudioParams) {
    return this.makeRequest<{
      audioUrl: string;
      duration: number;
    }>('generate_audio', params);
  }

  async getTaskStatus(taskId: string) {
    try {
      const token = localStorage.getItem('supabase.auth.token');
      
      const response = await fetch(`${this.baseUrl}?taskId=${taskId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Task status error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

export const sunaAI = new SunaAIClient();

// 辅助函数：生成完整的绘本内容
export async function generateCompleteStorybook(params: {
  title: string;
  prompt: string;
  ageGroup: string;
  language: string;
  pageCount: number;
}) {
  try {
    // 1. 生成故事文本
    const storyResult = await sunaAI.generateStory({
      prompt: params.prompt,
      ageGroup: params.ageGroup,
      language: params.language,
      pageCount: params.pageCount,
    });

    if (!storyResult.success || !storyResult.data) {
      throw new Error(storyResult.error || 'Failed to generate story');
    }

    const { pages, title, summary } = storyResult.data;

    // 2. 为每一页生成图片
    const pagesWithImages = await Promise.all(
      pages.map(async (page, index) => {
        const imageResult = await sunaAI.generateImage({
          prompt: page.imagePrompt,
          style: 'children_illustration',
        });

        return {
          id: `page_${index + 1}`,
          pageNumber: page.pageNumber,
          text: page.text,
          imagePrompt: page.imagePrompt,
          imageUrl: imageResult.success ? imageResult.data?.imageUrl : undefined,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      })
    );

    // 3. 为每一页生成音频（可选）
    const pagesWithAudio = await Promise.all(
      pagesWithImages.map(async (page) => {
        const audioResult = await sunaAI.generateAudio({
          text: page.text,
          language: params.language,
        });

        return {
          ...page,
          audioUrl: audioResult.success ? audioResult.data?.audioUrl : undefined,
        };
      })
    );

    return {
      success: true,
      data: {
        title: title || params.title,
        summary: summary || '',
        pages: pagesWithAudio,
      },
    };

  } catch (error) {
    console.error('Generate complete storybook error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// 辅助函数：重新生成单页内容
export async function regeneratePage(params: {
  pageNumber: number;
  textPrompt: string;
  imagePrompt: string;
  language: string;
}) {
  try {
    // 并行生成图片和音频
    const [imageResult, audioResult] = await Promise.all([
      sunaAI.generateImage({
        prompt: params.imagePrompt,
        style: 'children_illustration',
      }),
      sunaAI.generateAudio({
        text: params.textPrompt,
        language: params.language,
      }),
    ]);

    return {
      success: true,
      data: {
        pageNumber: params.pageNumber,
        text: params.textPrompt,
        imagePrompt: params.imagePrompt,
        imageUrl: imageResult.success ? imageResult.data?.imageUrl : undefined,
        audioUrl: audioResult.success ? audioResult.data?.audioUrl : undefined,
        updatedAt: new Date(),
      },
    };

  } catch (error) {
    console.error('Regenerate page error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

