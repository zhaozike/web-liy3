"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface CreateStorybookData {
  title: string;
  description: string;
  ageGroup: 'toddler' | 'preschool' | 'elementary' | 'all';
  language: 'zh' | 'en';
  tags: string[];
  prompt: string;
  pageCount: number;
}

export default function CreateStorybookWizard() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState<CreateStorybookData>({
    title: '',
    description: '',
    ageGroup: 'preschool',
    language: 'zh',
    tags: [],
    prompt: '',
    pageCount: 8,
  });

  const ageGroups = [
    { value: 'toddler', label: '👶 幼儿 (2-3岁)', description: '简单的词汇和概念' },
    { value: 'preschool', label: '🧒 学龄前 (4-5岁)', description: '基础故事和教育内容' },
    { value: 'elementary', label: '👦 小学生 (6-8岁)', description: '复杂情节和深度内容' },
    { value: 'all', label: '👨‍👩‍👧‍👦 全年龄', description: '适合所有年龄段' },
  ];

  const suggestedTags = [
    '冒险', '友谊', '家庭', '动物', '魔法', '科学', '历史', '自然',
    '勇气', '善良', '诚实', '分享', '梦想', '成长', '探索', '创造'
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleTagToggle = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error('请先登录');
      return;
    }

    if (!formData.title.trim() || !formData.prompt.trim()) {
      toast.error('请填写完整信息');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/storybooks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const { storybookId } = await response.json();
        toast.success('绘本创建成功！正在生成内容...');
        router.push(`/storybook/${storybookId}/edit`);
      } else {
        throw new Error('创建失败');
      }
    } catch (error) {
      toast.error('创建失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* 进度条 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-600">步骤 {step} / 3</span>
          <span className="text-sm text-gray-500">
            {step === 1 && '基本信息'}
            {step === 2 && '创作设置'}
            {step === 3 && '故事创意'}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8">
        {/* 步骤1：基本信息 */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                📚 创建你的绘本
              </h2>
              <p className="text-gray-600">
                让我们先了解一下你想要创作的绘本
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                绘本标题 *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="给你的绘本起个好听的名字"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                绘本简介
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="简单描述一下你的绘本内容"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                适合年龄 *
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                {ageGroups.map((group) => (
                  <div
                    key={group.value}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.ageGroup === group.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, ageGroup: group.value as any }))}
                  >
                    <div className="font-medium text-gray-800">{group.label}</div>
                    <div className="text-sm text-gray-600 mt-1">{group.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 步骤2：创作设置 */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                ⚙️ 创作设置
              </h2>
              <p className="text-gray-600">
                设置绘本的基本参数
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                语言
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    formData.language === 'zh'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, language: 'zh' }))}
                >
                  🇨🇳 中文
                </button>
                <button
                  type="button"
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    formData.language === 'en'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, language: 'en' }))}
                >
                  🇺🇸 English
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                页数
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="4"
                  max="16"
                  step="2"
                  value={formData.pageCount}
                  onChange={(e) => setFormData(prev => ({ ...prev, pageCount: parseInt(e.target.value) }))}
                  className="flex-1"
                />
                <span className="text-lg font-medium text-gray-800 min-w-[3rem]">
                  {formData.pageCount} 页
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                建议4-12页，页数越多生成时间越长
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                故事标签
              </label>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                      formData.tags.includes(tag)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                选择适合的标签，最多选择5个
              </p>
            </div>
          </div>
        )}

        {/* 步骤3：故事创意 */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                ✨ 故事创意
              </h2>
              <p className="text-gray-600">
                告诉AI你想要什么样的故事
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                故事创意描述 *
              </label>
              <textarea
                value={formData.prompt}
                onChange={(e) => setFormData(prev => ({ ...prev, prompt: e.target.value }))}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="描述你想要的故事内容，比如：
• 主角是谁？
• 发生什么事情？
• 想要传达什么道理？
• 故事的背景设定？

例如：一只小兔子迷路了，在森林里遇到了各种动物朋友，最终在大家的帮助下找到了回家的路，学会了友谊和互助的重要性。"
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h4 className="font-medium text-yellow-800 mb-2">创作小贴士</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• 描述越详细，生成的故事越符合你的期望</li>
                    <li>• 可以指定主角的特征和性格</li>
                    <li>• 可以设定故事发生的地点和时间</li>
                    <li>• 可以提及想要传达的教育意义</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 按钮区域 */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 1}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            上一步
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            >
              下一步
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? '创建中...' : '🚀 开始创作'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

