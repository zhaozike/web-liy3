"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User, Mail, Calendar, BookOpen, Heart, Eye, Settings, Edit3, LogOut } from 'lucide-react';
import StorybookGrid from '@/components/storybook/StorybookGrid';

interface UserStats {
  totalStorybooks: number;
  totalViews: number;
  totalLikes: number;
  joinDate: string;
}

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [activeTab, setActiveTab] = useState<'storybooks' | 'settings'>('storybooks');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (user) {
      fetchUserStats();
    }
  }, [user, loading, router]);

  const fetchUserStats = async () => {
    try {
      const response = await fetch(`/api/users/${user?.id}/stats`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch user stats:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* 用户信息卡片 */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* 头像 */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                {user.user_metadata?.name?.[0] || user.email?.[0] || '👤'}
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors">
                <Edit3 size={16} />
              </button>
            </div>

            {/* 用户信息 */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {user.user_metadata?.name || '小作家'}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 mb-4">
                <Mail size={16} />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 mb-6">
                <Calendar size={16} />
                <span>加入时间：{new Date(user.created_at).toLocaleDateString()}</span>
              </div>

              {/* 统计数据 */}
              {stats && (
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-blue-600 mb-1">
                      <BookOpen size={20} />
                    </div>
                    <div className="text-2xl font-bold text-gray-800">{stats.totalStorybooks}</div>
                    <div className="text-sm text-gray-600">创作绘本</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-green-600 mb-1">
                      <Eye size={20} />
                    </div>
                    <div className="text-2xl font-bold text-gray-800">{stats.totalViews}</div>
                    <div className="text-sm text-gray-600">总阅读量</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-red-600 mb-1">
                      <Heart size={20} />
                    </div>
                    <div className="text-2xl font-bold text-gray-800">{stats.totalLikes}</div>
                    <div className="text-sm text-gray-600">获得喜欢</div>
                  </div>
                </div>
              )}
            </div>

            {/* 操作按钮 */}
            <div className="flex flex-col gap-3">
              <a
                href="/create"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-center"
              >
                ✨ 创作新绘本
              </a>
              <button
                onClick={handleSignOut}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut size={16} />
                退出登录
              </button>
            </div>
          </div>
        </div>

        {/* 标签页导航 */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('storybooks')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === 'storybooks'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              📚 我的绘本
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              ⚙️ 账户设置
            </button>
          </div>
        </div>

        {/* 标签页内容 */}
        {activeTab === 'storybooks' && (
          <StorybookGrid
            showFilters={true}
            showAuthor={false}
            showActions={true}
            userId={user.id}
          />
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">账户设置</h2>
            
            <div className="space-y-6">
              {/* 个人信息设置 */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">个人信息</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      昵称
                    </label>
                    <input
                      type="text"
                      defaultValue={user.user_metadata?.name || ''}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="请输入昵称"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      邮箱地址
                    </label>
                    <input
                      type="email"
                      value={user.email || ''}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* 隐私设置 */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">隐私设置</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-800">公开我的绘本</h4>
                      <p className="text-sm text-gray-600">允许其他用户在探索页面看到我的绘本</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-800">接收邮件通知</h4>
                      <p className="text-sm text-gray-600">接收关于绘本创作和平台更新的邮件</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* 危险操作 */}
              <div>
                <h3 className="text-lg font-medium text-red-600 mb-4">危险操作</h3>
                <div className="p-4 border border-red-200 rounded-xl bg-red-50">
                  <h4 className="font-medium text-red-800 mb-2">删除账户</h4>
                  <p className="text-sm text-red-600 mb-4">
                    删除账户将永久删除你的所有绘本和数据，此操作无法撤销。
                  </p>
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
                    删除账户
                  </button>
                </div>
              </div>

              {/* 保存按钮 */}
              <div className="flex justify-end pt-6 border-t border-gray-200">
                <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors">
                  保存设置
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

