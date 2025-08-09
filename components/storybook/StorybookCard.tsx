"use client";

import { Storybook } from '@/types/storybook';
import { Clock, Eye, Heart, User, Calendar } from 'lucide-react';
import { useState } from 'react';

interface StorybookCardProps {
  storybook: Storybook;
  onRead?: (storybook: Storybook) => void;
  onEdit?: (storybook: Storybook) => void;
  showAuthor?: boolean;
  showActions?: boolean;
}

export default function StorybookCard({ 
  storybook, 
  onRead, 
  onEdit, 
  showAuthor = true, 
  showActions = true 
}: StorybookCardProps) {
  const [imageError, setImageError] = useState(false);

  const getAgeGroupLabel = (ageGroup: string) => {
    switch (ageGroup) {
      case 'toddler': return '👶 幼儿';
      case 'preschool': return '🧒 学龄前';
      case 'elementary': return '👦 小学生';
      case 'all': return '👨‍👩‍👧‍👦 全年龄';
      default: return ageGroup;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return { label: '草稿', color: 'bg-gray-100 text-gray-700' };
      case 'generating': return { label: '生成中', color: 'bg-yellow-100 text-yellow-700' };
      case 'completed': return { label: '已完成', color: 'bg-green-100 text-green-700' };
      case 'published': return { label: '已发布', color: 'bg-blue-100 text-blue-700' };
      default: return { label: status, color: 'bg-gray-100 text-gray-700' };
    }
  };

  const statusInfo = getStatusLabel(storybook.status);

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* 封面图片 */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        {storybook.coverImageUrl && !imageError ? (
          <img
            src={storybook.coverImageUrl}
            alt={storybook.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2">📚</div>
              <div className="text-gray-500 text-sm">暂无封面</div>
            </div>
          </div>
        )}
        
        {/* 状态标签 */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
            {statusInfo.label}
          </span>
        </div>

        {/* 年龄组标签 */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
            {getAgeGroupLabel(storybook.ageGroup)}
          </span>
        </div>

        {/* 悬停时显示的操作按钮 */}
        {showActions && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <button
              onClick={() => onRead?.(storybook)}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              📖 阅读
            </button>
            {onEdit && (
              <button
                onClick={() => onEdit?.(storybook)}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
              >
                ✏️ 编辑
              </button>
            )}
          </div>
        )}
      </div>

      {/* 内容区域 */}
      <div className="p-4">
        {/* 标题 */}
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {storybook.title}
        </h3>

        {/* 描述 */}
        {storybook.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {storybook.description}
          </p>
        )}

        {/* 标签 */}
        {storybook.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {storybook.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {storybook.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-full">
                +{storybook.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* 作者信息 */}
        {showAuthor && (
          <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
            <User size={14} />
            <span>{storybook.authorName}</span>
          </div>
        )}

        {/* 统计信息 */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{storybook.estimatedReadTime}分钟</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={12} />
              <span>{storybook.viewCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart size={12} />
              <span>{storybook.likeCount}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{new Date(storybook.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* 页数信息 */}
        <div className="mt-2 text-xs text-gray-400">
          共 {storybook.totalPages} 页
        </div>
      </div>

      {/* 底部操作栏（移动端友好） */}
      {showActions && (
        <div className="p-4 pt-0 sm:hidden">
          <div className="flex gap-2">
            <button
              onClick={() => onRead?.(storybook)}
              className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors text-sm"
            >
              📖 阅读
            </button>
            {onEdit && (
              <button
                onClick={() => onEdit?.(storybook)}
                className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors text-sm"
              >
                ✏️ 编辑
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

