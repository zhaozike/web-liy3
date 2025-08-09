// 绘本相关类型定义

export interface StoryPage {
  id: string;
  pageNumber: number;
  text: string;
  imageUrl?: string;
  imagePrompt?: string;
  audioUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Storybook {
  _id?: string;
  id: string;
  title: string;
  description: string;
  coverImageUrl?: string;
  pages: StoryPage[];
  authorId: string;
  authorName: string;
  isPublic: boolean;
  tags: string[];
  ageGroup: 'toddler' | 'preschool' | 'elementary' | 'all';
  language: 'zh' | 'en';
  status: 'draft' | 'generating' | 'completed' | 'published';
  totalPages: number;
  estimatedReadTime: number; // 分钟
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  viewCount: number;
  likeCount: number;
}

export interface CreateStorybookRequest {
  title: string;
  description: string;
  ageGroup: 'toddler' | 'preschool' | 'elementary' | 'all';
  language: 'zh' | 'en';
  tags: string[];
  prompt: string; // 用户输入的创作提示
  pageCount: number; // 期望的页数
}

export interface GeneratePageRequest {
  storybookId: string;
  pageNumber: number;
  textPrompt: string;
  imagePrompt: string;
  previousContext?: string; // 前面页面的上下文
}

export interface AIGenerationResponse {
  success: boolean;
  data?: {
    text?: string;
    imageUrl?: string;
    audioUrl?: string;
  };
  error?: string;
}

export interface StorybookFilters {
  ageGroup?: string;
  language?: string;
  tags?: string[];
  authorId?: string;
  status?: string;
  isPublic?: boolean;
}

export interface StorybookListResponse {
  storybooks: Storybook[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

