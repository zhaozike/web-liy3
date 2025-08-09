"use client";

import { useState, useEffect } from 'react';
import { Storybook, StorybookFilters } from '@/types/storybook';
import StorybookCard from './StorybookCard';
import StorybookReader from './StorybookReader';
import { Search, Filter, Grid, List } from 'lucide-react';

interface StorybookGridProps {
  initialStorybooks?: Storybook[];
  showFilters?: boolean;
  showAuthor?: boolean;
  showActions?: boolean;
  userId?: string; // 如果提供，只显示该用户的绘本
}

export default function StorybookGrid({ 
  initialStorybooks = [], 
  showFilters = true,
  showAuthor = true,
  showActions = true,
  userId 
}: StorybookGridProps) {
  const [storybooks, setStorybooks] = useState<Storybook[]>(initialStorybooks);
  const [filteredStorybooks, setFilteredStorybooks] = useState<Storybook[]>(initialStorybooks);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReader, setSelectedReader] = useState<Storybook | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<StorybookFilters>({
    ageGroup: '',
    language: '',
    tags: [],
    status: '',
    isPublic: undefined,
  });

  // 获取绘本数据
  useEffect(() => {
    fetchStorybooks();
  }, [userId, filters]);

  // 搜索和过滤
  useEffect(() => {
    let filtered = storybooks;

    // 搜索过滤
    if (searchTerm) {
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredStorybooks(filtered);
  }, [storybooks, searchTerm]);

  const fetchStorybooks = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (userId) params.append('authorId', userId);
      if (filters.ageGroup) params.append('ageGroup', filters.ageGroup);
      if (filters.language) params.append('language', filters.language);
      if (filters.status) params.append('status', filters.status);
      if (filters.isPublic !== undefined) params.append('isPublic', filters.isPublic.toString());

      const response = await fetch(`/api/storybooks?${params}`);
      if (response.ok) {
        const data = await response.json();
        setStorybooks(data.storybooks || []);
      }
    } catch (error) {
      console.error('Failed to fetch storybooks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRead = (storybook: Storybook) => {
    setSelectedReader(storybook);
    // 增加阅读次数
    updateViewCount(storybook.id);
  };

  const handleEdit = (storybook: Storybook) => {
    window.location.href = `/storybook/${storybook.id}/edit`;
  };

  const updateViewCount = async (storybookId: string) => {
    try {
      await fetch(`/api/storybooks/${storybookId}/view`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Failed to update view count:', error);
    }
  };

  const ageGroups = [
    { value: '', label: '全部年龄' },
    { value: 'toddler', label: '👶 幼儿 (2-3岁)' },
    { value: 'preschool', label: '🧒 学龄前 (4-5岁)' },
    { value: 'elementary', label: '👦 小学生 (6-8岁)' },
    { value: 'all', label: '👨‍👩‍👧‍👦 全年龄' },
  ];

  const languages = [
    { value: '', label: '全部语言' },
    { value: 'zh', label: '🇨🇳 中文' },
    { value: 'en', label: '🇺🇸 English' },
  ];

  const statuses = [
    { value: '', label: '全部状态' },
    { value: 'draft', label: '草稿' },
    { value: 'generating', label: '生成中' },
    { value: 'completed', label: '已完成' },
    { value: 'published', label: '已发布' },
  ];

  return (
    <div className="space-y-6">
      {/* 搜索和过滤栏 */}
      {showFilters && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {/* 搜索框 */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="搜索绘本标题、描述或标签..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 过滤器 */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">筛选：</span>
            </div>

            <select
              value={filters.ageGroup || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, ageGroup: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {ageGroups.map(group => (
                <option key={group.value} value={group.value}>
                  {group.label}
                </option>
              ))}
            </select>

            <select
              value={filters.language || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, language: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {languages.map(lang => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>

            {userId && (
              <select
                value={filters.status || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            )}

            {/* 视图模式切换 */}
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
                title="网格视图"
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
                title="列表视图"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 加载状态 */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* 绘本网格/列表 */}
      {!loading && (
        <>
          {filteredStorybooks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-medium text-gray-600 mb-2">
                {searchTerm ? '没有找到匹配的绘本' : '还没有绘本'}
              </h3>
              <p className="text-gray-500">
                {searchTerm ? '试试其他关键词' : '开始创作你的第一本绘本吧！'}
              </p>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }>
              {filteredStorybooks.map((storybook) => (
                <StorybookCard
                  key={storybook.id}
                  storybook={storybook}
                  onRead={handleRead}
                  onEdit={showActions ? handleEdit : undefined}
                  showAuthor={showAuthor}
                  showActions={showActions}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* 绘本阅读器 */}
      {selectedReader && (
        <StorybookReader
          storybook={selectedReader}
          onClose={() => setSelectedReader(null)}
        />
      )}
    </div>
  );
}

