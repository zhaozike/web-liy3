"use client";

import StorybookGrid from '@/components/storybook/StorybookGrid';

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🌟 探索精彩绘本
          </h1>
          <p className="text-lg text-gray-600">
            发现其他小朋友创作的有趣故事
          </p>
        </div>

        {/* 特色推荐 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🔥 热门推荐
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🦄</div>
              <h3 className="font-medium text-gray-800">奇幻冒险</h3>
              <p className="text-sm text-gray-600">神奇的魔法世界</p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🐻</div>
              <h3 className="font-medium text-gray-800">动物朋友</h3>
              <p className="text-sm text-gray-600">可爱的动物故事</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="font-medium text-gray-800">太空探索</h3>
              <p className="text-sm text-gray-600">星际冒险之旅</p>
            </div>
          </div>
        </div>

        {/* 绘本网格 */}
        <StorybookGrid
          showFilters={true}
          showAuthor={true}
          showActions={true}
        />
      </div>
    </div>
  );
}

