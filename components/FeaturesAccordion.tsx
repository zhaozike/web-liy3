"use client";

import { useState } from "react";
import Image from "next/image";

const FeaturesAccordion = () => {
  const [featureSelected, setFeatureSelected] = useState(0);

  const features = [
    {
      title: "🎨 AI智能绘图",
      description: "只需要描述你想要的画面，AI就能为你画出精美的插图",
      type: "video",
      path: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      format: "image",
      alt: "AI绘图功能展示",
    },
    {
      title: "📚 故事自动生成",
      description: "输入你的想法，AI帮你编写完整的故事情节",
      type: "video", 
      path: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      format: "image",
      alt: "故事生成功能",
    },
    {
      title: "🎵 语音朗读",
      description: "专业的语音朗读，让故事更加生动有趣",
      type: "video",
      path: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
      format: "image",
      alt: "语音朗读功能",
    },
    {
      title: "📖 个人绘本库",
      description: "保存你创作的所有绘本，随时可以重新阅读",
      type: "video",
      path: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      format: "image", 
      alt: "个人绘本库",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-green-50" id="features">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="lg:w-1/2">
            <h2 className="font-extrabold text-4xl lg:text-5xl tracking-tight mb-8">
              <span className="text-blue-600">神奇功能</span>
              <br />
              <span className="text-green-600">等你探索</span> ✨
            </h2>
            <div className="space-y-4">
              {features.map((feature, i) => (
                <div
                  key={feature.title}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                    featureSelected === i
                      ? "bg-white shadow-lg border-2 border-blue-200"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                  onClick={() => setFeatureSelected(i)}
                >
                  <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <Image
                src={features[featureSelected].path}
                alt={features[featureSelected].alt}
                className="w-full rounded-2xl"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesAccordion;

