import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// 使用当前的suna-storybook Supabase配置
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const sunaApiBaseUrl = process.env.NEXT_PUBLIC_SUNA_API_BASE_URL || 'https://suna-1.learnwise.app';

// 创建Supabase客户端用于JWT验证和生成
const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface SunaApiRequest {
  action: string;
  prompt?: string;
  ageGroup?: string;
  language?: string;
  pageCount?: number;
  style?: string;
  size?: string;
  text?: string;
  voice?: string;
}

export async function POST(request: NextRequest) {
  try {
    // 获取请求体
    const body: SunaApiRequest = await request.json();
    const { action, ...params } = body;

    // 获取用户认证token
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Missing or invalid authorization header' },
        { status: 401 }
      );
    }

    const userToken = authHeader.substring(7);

    // 验证用户token并获取用户信息
    const { data: { user }, error: authError } = await supabase.auth.getUser(userToken);
    
    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Invalid user token' },
        { status: 401 }
      );
    }

    // 生成用于Suna AI的JWT
    // 这里需要根据Suna AI的具体认证要求来实现
    const sunaJWT = await generateSunaJWT(user);

    // 调用Suna AI API
    const sunaResponse = await callSunaAPI(action, params, sunaJWT);

    return NextResponse.json(sunaResponse);

  } catch (error) {
    console.error('Suna proxy error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // 处理任务状态查询
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('taskId');

    if (!taskId) {
      return NextResponse.json(
        { success: false, error: 'Missing taskId parameter' },
        { status: 400 }
      );
    }

    // 获取用户认证token
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Missing or invalid authorization header' },
        { status: 401 }
      );
    }

    const userToken = authHeader.substring(7);

    // 验证用户token
    const { data: { user }, error: authError } = await supabase.auth.getUser(userToken);
    
    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Invalid user token' },
        { status: 401 }
      );
    }

    // 生成用于Suna AI的JWT
    const sunaJWT = await generateSunaJWT(user);

    // 查询任务状态
    const statusResponse = await fetch(`${sunaApiBaseUrl}/api/tasks/${taskId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sunaJWT}`,
        'Content-Type': 'application/json',
      },
    });

    if (!statusResponse.ok) {
      throw new Error(`Suna API error: ${statusResponse.status}`);
    }

    const statusData = await statusResponse.json();
    return NextResponse.json({
      success: true,
      data: statusData,
    });

  } catch (error) {
    console.error('Suna proxy GET error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

// 生成用于Suna AI的JWT
async function generateSunaJWT(user: any): Promise<string> {
  try {
    // 方案1: 使用当前用户的token直接调用
    // 这需要确认Suna AI是否接受我们的Supabase JWT
    
    // 方案2: 使用服务角色密钥生成新的JWT
    // 为用户创建一个临时的认证会话
    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: user.email,
      options: {
        redirectTo: `${sunaApiBaseUrl}/auth/callback`,
      },
    });

    if (error) {
      throw new Error(`Failed to generate auth link: ${error.message}`);
    }

    // 从生成的链接中提取token
    const url = new URL(data.properties.action_link);
    const token = url.searchParams.get('token');
    
    if (!token) {
      throw new Error('Failed to extract token from auth link');
    }

    return token;

  } catch (error) {
    console.error('JWT generation error:', error);
    throw error;
  }
}

// 调用Suna AI API
async function callSunaAPI(action: string, params: any, jwt: string) {
  try {
    let endpoint = '';
    let method = 'POST';
    let body: any = { ...params };

    // 根据action确定API端点
    switch (action) {
      case 'generate_story':
        endpoint = '/api/generate/story';
        body = {
          prompt: params.prompt,
          age_group: params.ageGroup,
          language: params.language,
          page_count: params.pageCount,
        };
        break;
      
      case 'generate_image':
        endpoint = '/api/generate/image';
        body = {
          prompt: params.prompt,
          style: params.style || 'children_illustration',
          size: params.size || '1024x1024',
        };
        break;
      
      case 'generate_audio':
        endpoint = '/api/generate/audio';
        body = {
          text: params.text,
          voice: params.voice || 'default',
          language: params.language || 'zh-CN',
        };
        break;
      
      default:
        throw new Error(`Unknown action: ${action}`);
    }

    const response = await fetch(`${sunaApiBaseUrl}${endpoint}`, {
      method,
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Suna API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      data,
    };

  } catch (error) {
    console.error(`Suna API call error for action ${action}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

