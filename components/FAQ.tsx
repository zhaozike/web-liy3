const FAQ = () => {
  return (
    <section className="bg-gradient-to-r from-purple-50 to-pink-50 py-24" id="faq">
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="font-bold text-4xl lg:text-5xl tracking-tight mb-4">
            <span className="text-purple-600">常见问题</span> 🤔
          </h2>
          <p className="text-lg text-gray-600">
            小朋友和家长们最关心的问题
          </p>
        </div>

        <div className="space-y-6">
          <div className="collapse collapse-plus bg-white shadow-lg rounded-2xl">
            <input type="radio" name="faq-accordion" defaultChecked />
            <div className="collapse-title text-xl font-bold text-gray-800">
              🎨 AI能画出什么样的图片？
            </div>
            <div className="collapse-content">
              <p className="text-gray-600 leading-relaxed">
                AI可以画出各种风格的图片！比如可爱的卡通动物、美丽的风景、
                神奇的城堡、太空冒险等等。只要你能想到的，AI都能帮你画出来！
                而且每次生成的图片都是独一无二的哦！
              </p>
            </div>
          </div>

          <div className="collapse collapse-plus bg-white shadow-lg rounded-2xl">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-xl font-bold text-gray-800">
              📚 我可以创作多少本绘本？
            </div>
            <div className="collapse-content">
              <p className="text-gray-600 leading-relaxed">
                基础版每个月可以创作5本绘本，高级版可以无限制创作！
                每本绘本都会保存在你的个人图书馆里，随时可以重新阅读和分享给朋友们。
              </p>
            </div>
          </div>

          <div className="collapse collapse-plus bg-white shadow-lg rounded-2xl">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-xl font-bold text-gray-800">
              🎵 语音朗读是真人声音吗？
            </div>
            <div className="collapse-content">
              <p className="text-gray-600 leading-relaxed">
                我们使用最先进的AI语音技术，声音非常自然好听！
                就像真人在为你朗读故事一样。高级版还支持多种语言的朗读呢！
              </p>
            </div>
          </div>

          <div className="collapse collapse-plus bg-white shadow-lg rounded-2xl">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-xl font-bold text-gray-800">
              👨‍👩‍👧‍👦 家长需要陪同使用吗？
            </div>
            <div className="collapse-content">
              <p className="text-gray-600 leading-relaxed">
                我们的平台非常安全和简单！小朋友可以独立使用，
                但我们建议家长可以陪同一起创作，这样会更有趣哦！
                家长也可以在后台查看孩子的创作内容。
              </p>
            </div>
          </div>

          <div className="collapse collapse-plus bg-white shadow-lg rounded-2xl">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-xl font-bold text-gray-800">
              💝 可以分享给朋友吗？
            </div>
            <div className="collapse-content">
              <p className="text-gray-600 leading-relaxed">
                当然可以！你可以把创作的绘本分享给家人和朋友，
                让他们也能看到你的精彩作品。高级版用户还可以导出绘本制作成实体书呢！
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

