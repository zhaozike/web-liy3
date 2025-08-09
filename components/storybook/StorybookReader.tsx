"use client";

import { useState, useEffect, useRef } from 'react';
import { Storybook, StoryPage } from '@/types/storybook';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Home, List } from 'lucide-react';

interface StorybookReaderProps {
  storybook: Storybook;
  onClose?: () => void;
}

export default function StorybookReader({ storybook, onClose }: StorybookReaderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showTableOfContents, setShowTableOfContents] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const currentPageData = storybook.pages[currentPage];
  const totalPages = storybook.pages.length;

  // 自动隐藏控制栏
  useEffect(() => {
    const resetControlsTimeout = () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      setShowControls(true);
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };

    resetControlsTimeout();
    
    const handleMouseMove = () => resetControlsTimeout();
    const handleKeyDown = () => resetControlsTimeout();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyDown);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  // 键盘导航
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPreviousPage();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNextPage();
          break;
        case ' ':
          e.preventDefault();
          toggleAudio();
          break;
        case 'Escape':
          e.preventDefault();
          onClose?.();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, isPlaying]);

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      setIsPlaying(false);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setIsPlaying(false);
    }
  };

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
    setShowTableOfContents(false);
    setIsPlaying(false);
  };

  const toggleAudio = () => {
    if (!currentPageData?.audioUrl) return;
    
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* 音频元素 */}
      {currentPageData?.audioUrl && (
        <audio
          ref={audioRef}
          src={currentPageData.audioUrl}
          onEnded={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          muted={isMuted}
        />
      )}

      {/* 顶部控制栏 */}
      <div className={`absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-4 transition-opacity duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              title="返回"
            >
              <Home size={24} />
            </button>
            <div>
              <h1 className="text-xl font-bold">{storybook.title}</h1>
              <p className="text-sm text-white/80">
                第 {currentPage + 1} 页 / 共 {totalPages} 页
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTableOfContents(!showTableOfContents)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              title="目录"
            >
              <List size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* 目录侧边栏 */}
      {showTableOfContents && (
        <div className="absolute top-0 right-0 bottom-0 w-80 bg-white/95 backdrop-blur-sm z-20 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">目录</h2>
            <button
              onClick={() => setShowTableOfContents(false)}
              className="p-2 hover:bg-gray-200 rounded-full"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-2">
            {storybook.pages.map((page, index) => (
              <button
                key={page.id}
                onClick={() => goToPage(index)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  index === currentPage
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : 'hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                <div className="font-medium text-gray-800">
                  第 {index + 1} 页
                </div>
                <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {page.text.substring(0, 50)}...
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 主要内容区域 */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-4xl w-full h-full flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full h-full max-h-[80vh] flex flex-col">
            {/* 页面图片 */}
            {currentPageData?.imageUrl && (
              <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-8">
                <img
                  src={currentPageData.imageUrl}
                  alt={`第${currentPage + 1}页插图`}
                  className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
                />
              </div>
            )}
            
            {/* 页面文本 */}
            <div className="p-8 bg-white">
              <p className="text-lg leading-relaxed text-gray-800 text-center font-medium">
                {currentPageData?.text}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 底部控制栏 */}
      <div className={`absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="flex items-center justify-between text-white">
          {/* 左侧：上一页按钮 */}
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-colors"
          >
            <ChevronLeft size={20} />
            <span className="hidden sm:inline">上一页</span>
          </button>

          {/* 中间：音频控制 */}
          <div className="flex items-center gap-4">
            {currentPageData?.audioUrl && (
              <>
                <button
                  onClick={toggleAudio}
                  className="p-3 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors"
                  title={isPlaying ? '暂停' : '播放'}
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                
                <button
                  onClick={toggleMute}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  title={isMuted ? '取消静音' : '静音'}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </>
            )}
          </div>

          {/* 右侧：下一页按钮 */}
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages - 1}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-colors"
          >
            <span className="hidden sm:inline">下一页</span>
            <ChevronRight size={20} />
          </button>
        </div>

        {/* 进度条 */}
        <div className="mt-4">
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/80 mt-1">
            <span>开始</span>
            <span>{Math.round(((currentPage + 1) / totalPages) * 100)}%</span>
            <span>结束</span>
          </div>
        </div>
      </div>

      {/* 点击区域导航 */}
      <div className="absolute inset-0 flex">
        {/* 左半边：上一页 */}
        <div
          className="flex-1 cursor-pointer"
          onClick={goToPreviousPage}
          style={{ display: currentPage === 0 ? 'none' : 'block' }}
        />
        {/* 右半边：下一页 */}
        <div
          className="flex-1 cursor-pointer"
          onClick={goToNextPage}
          style={{ display: currentPage === totalPages - 1 ? 'none' : 'block' }}
        />
      </div>

      {/* 使用提示 */}
      {showControls && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="bg-black/50 text-white px-4 py-2 rounded-lg text-sm opacity-70">
            点击左右两侧翻页 • 空格键播放/暂停 • ESC键退出
          </div>
        </div>
      )}
    </div>
  );
}

