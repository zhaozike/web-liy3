const Problem = () => {
  return (
    <section className="bg-gradient-to-r from-pink-50 to-purple-50 py-24">
      <div className="max-w-7xl mx-auto px-8 text-center">
        <h2 className="font-bold text-4xl lg:text-5xl tracking-tight mb-12 text-gray-800">
          小朋友们的
          <span className="text-pink-500"> 创作烦恼 </span>
          😔
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-6xl mb-4">😵‍💫</div>
            <h3 className="font-bold text-xl mb-4 text-gray-800">不知道画什么</h3>
            <p className="text-gray-600">
              脑海里有很多想法，但是不知道怎么画出来，
              总是画不出心里想的样子
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-6xl mb-4">😰</div>
            <h3 className="font-bold text-xl mb-4 text-gray-800">画画太难了</h3>
            <p className="text-gray-600">
              想要画出漂亮的图画需要很长时间练习，
              而且总是画得不够好看
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-6xl mb-4">😢</div>
            <h3 className="font-bold text-xl mb-4 text-gray-800">故事写不完</h3>
            <p className="text-gray-600">
              有了开头却不知道怎么继续，
              想要的故事总是写不完整
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-8 rounded-3xl text-white">
          <h3 className="font-bold text-2xl mb-4">
            🎉 现在有了AI绘本助手！
          </h3>
          <p className="text-lg opacity-90">
            只要告诉我们你想要什么样的故事，AI就能帮你创作出完整的绘本，
            还有美丽的插图和动听的朗读声音！
          </p>
        </div>
      </div>
    </section>
  );
};

export default Problem;

