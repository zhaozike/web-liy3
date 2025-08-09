# 儿童AI绘本网站前端架构设计

## 项目概述

基于 `zorrolab/offical-website` 模板，开发一个专为儿童设计的AI绘本创作和阅读平台。

## 技术栈

### 核心框架
- **Next.js 14** - React全栈框架，使用App Router
- **TypeScript** - 类型安全的JavaScript
- **Tailwind CSS** - 实用优先的CSS框架
- **DaisyUI** - Tailwind CSS组件库

### 状态管理
- **React Context** - 用户认证状态管理
- **React Hooks** - 本地状态管理

### 认证与数据库
- **NextAuth.js** - 用户认证
- **MongoDB** - 主数据库（用户、绘本、订单等）
- **Supabase** - 后端代理数据库
- **Mongoose** - MongoDB ODM

### 外部服务集成
- **Suna AI** - AI绘本生成服务
- **Resend** - 邮件服务
- **Creem** - 支付服务
- **Google OAuth** - 第三方登录

## 项目结构

```
children-ai-book-website/
├── app/                          # Next.js App Router
│   ├── api/                      # API路由
│   │   ├── auth/                 # 认证相关API
│   │   ├── books/                # 绘本相关API
│   │   ├── suna-proxy/           # Suna AI代理API
│   │   ├── payment/              # 支付相关API
│   │   └── webhook/              # Webhook处理
│   ├── (auth)/                   # 认证页面组
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/              # 用户仪表板
│   │   ├── profile/
│   │   ├── my-books/
│   │   └── subscription/
│   ├── books/                    # 绘本相关页面
│   │   ├── create/               # 创建绘本
│   │   ├── [id]/                 # 绘本详情
│   │   └── read/[id]/            # 绘本阅读
│   ├── explore/                  # 探索页面
│   ├── pricing/                  # 定价页面
│   ├── help/                     # 帮助页面
│   ├── layout.tsx                # 根布局
│   ├── page.tsx                  # 首页
│   └── globals.css               # 全局样式
├── components/                   # 可复用组件
│   ├── ui/                       # 基础UI组件
│   ├── layout/                   # 布局组件
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── auth/                     # 认证组件
│   ├── books/                    # 绘本相关组件
│   │   ├── BookCard.tsx
│   │   ├── BookReader.tsx
│   │   ├── BookCreator.tsx
│   │   └── BookEditor.tsx
│   └── common/                   # 通用组件
├── lib/                          # 工具库
│   ├── auth.ts                   # 认证配置
│   ├── mongodb.ts                # MongoDB连接
│   ├── supabase.ts               # Supabase客户端
│   ├── suna-api.ts               # Suna AI API客户端
│   └── utils.ts                  # 工具函数
├── models/                       # 数据模型
│   ├── User.ts
│   ├── Book.ts
│   ├── Order.ts
│   └── Subscription.ts
├── types/                        # TypeScript类型定义
├── public/                       # 静态资源
└── config.ts                     # 应用配置
```

## 核心功能模块

### 1. 用户认证模块
- **登录/注册**: 邮箱注册、Google OAuth
- **密码管理**: 密码重置、修改密码
- **用户状态**: 全局用户状态管理

### 2. 绘本创作模块
- **AI生成**: 集成Suna AI服务
- **内容编辑**: 文本、图片编辑
- **预览功能**: 实时预览绘本效果

### 3. 绘本阅读模块
- **沉浸式阅读**: 全屏阅读体验
- **翻页动画**: 流畅的页面切换
- **音频播放**: 语音朗读功能
- **导航控制**: 目录、进度条

### 4. 用户管理模块
- **个人中心**: 用户信息管理
- **我的绘本**: 创作历史管理
- **订阅管理**: 付费计划管理

### 5. 支付订阅模块
- **定价展示**: 订阅计划对比
- **支付处理**: Creem支付集成
- **订阅状态**: 订阅状态跟踪

## 设计原则

### 儿童友好设计
- **色彩方案**: 明黄、浅蓝、草绿为主色调
- **字体选择**: 圆润、易读的无衬线字体
- **交互元素**: 大按钮、清晰图标
- **动画效果**: 平滑、自然的过渡动画

### 响应式设计
- **移动优先**: 优先考虑移动端体验
- **断点设计**: 适配手机、平板、桌面
- **触摸友好**: 适合触摸操作的界面

### 性能优化
- **图片优化**: Next.js Image组件
- **代码分割**: 动态导入和懒加载
- **缓存策略**: 合理的缓存配置

## API设计

### 认证API
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/logout` - 用户登出
- `POST /api/auth/reset-password` - 密码重置

### 绘本API
- `GET /api/books` - 获取绘本列表
- `POST /api/books` - 创建绘本
- `GET /api/books/[id]` - 获取绘本详情
- `PUT /api/books/[id]` - 更新绘本
- `DELETE /api/books/[id]` - 删除绘本

### Suna AI代理API
- `POST /api/suna-proxy/generate` - 生成绘本内容

### 支付API
- `POST /api/payment/create-checkout` - 创建支付会话
- `POST /api/webhook/creem` - 支付回调处理

## 数据流设计

### 绘本创作流程
1. 用户输入创作提示词
2. 前端调用 `/api/suna-proxy/generate`
3. 后端代理转发请求到Suna AI
4. Suna AI返回生成的绘本内容
5. 保存绘本到MongoDB
6. 前端展示生成结果

### 用户认证流程
1. 用户提交登录信息
2. NextAuth.js验证凭据
3. 创建用户会话
4. 更新全局认证状态
5. 重定向到目标页面

## 部署配置

### 环境变量
- 所有敏感信息通过环境变量配置
- 开发和生产环境分离
- Vercel环境变量管理

### 构建配置
- `output: 'standalone'` - 支持动态功能
- 图片域名白名单配置
- 静态资源优化

## 开发规范

### 代码规范
- ESLint + Prettier代码格式化
- TypeScript严格模式
- 组件命名规范

### 错误处理
- 统一错误处理机制
- 用户友好的错误提示
- 加载状态管理

### 测试策略
- 组件单元测试
- API集成测试
- 端到端测试

## 后续优化

### 性能优化
- 图片懒加载
- 组件懒加载
- CDN加速

### 功能扩展
- 多语言支持
- 离线阅读
- 社交分享
- 绘本评论系统

