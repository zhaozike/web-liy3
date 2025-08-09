import config from "@/config";

const CTA = () => {
  return (
    <section className="relative py-24 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight text-white mb-6">
          🌟 开始你的
          <br />
          <span className="text-yellow-100">创作之旅</span>
        </h2>
        
        <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
          加入我们，让AI帮你创作出世界上独一无二的绘本故事！
          每个小朋友都是天生的故事家 ✨
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/create"
            className="btn btn-primary btn-lg text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 bg-white text-orange-500 border-none hover:bg-yellow-50"
          >
            🚀 立即开始创作
          </a>
          
          <a
            href="/explore"
            className="btn btn-outline btn-lg text-lg font-bold text-white border-white hover:bg-white hover:text-orange-500 hover:border-white"
          >
            📖 查看示例绘本
          </a>
        </div>

        <div className="mt-12 flex justify-center items-center gap-8 text-white/80">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎨</span>
            <span>AI智能绘图</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <span>故事生成</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎵</span>
            <span>语音朗读</span>
          </div>
        </div>
      </div>
      
      {/* 装饰性元素 */}
      <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">⭐</div>
      <div className="absolute top-20 right-20 text-4xl opacity-20 animate-pulse">🌈</div>
      <div className="absolute bottom-10 left-20 text-5xl opacity-20 animate-bounce delay-1000">🎈</div>
      <div className="absolute bottom-20 right-10 text-3xl opacity-20 animate-pulse delay-500">✨</div>
    </section>
  );
};

export default CTA;

