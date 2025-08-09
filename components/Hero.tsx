import Image from "next/image";
import TestimonialsAvatars from "./TestimonialsAvatars";
import config from "@/config";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto bg-gradient-to-br from-yellow-50 via-blue-50 to-green-50 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
        <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
          <span className="text-yellow-500">✨ 创造</span>属于你的
          <br />
          <span className="text-blue-500">🎨 神奇绘本</span>
          <br />
          <span className="text-green-500">🌟 故事世界</span>
        </h1>
        <p className="text-lg opacity-80 leading-relaxed max-w-xl">
          用AI的魔法，让每个小朋友都能成为故事的创造者！
          只需要说出你的想法，就能生成精美的绘本故事，
          还有好听的声音为你朗读哦！
        </p>

        <a href="/create" className="btn btn-primary btn-wide text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
          🚀 开始创作我的绘本
        </a>

        <TestimonialsAvatars priority={true} />
      </div>
      <div className="lg:w-full">
        <Image
          src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="儿童阅读绘本"
          className="w-full rounded-3xl shadow-2xl"
          priority={true}
          width={500}
          height={400}
        />
      </div>
    </section>
  );
};

export default Hero;

