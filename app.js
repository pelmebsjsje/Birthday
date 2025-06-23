const App = () => {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [timeLeft, setTimeLeft] = React.useState('');
  const [isMusicPlaying, setIsMusicPlaying] = React.useState(false);
  const [showGiftModal, setShowGiftModal] = React.useState(false);
  const audioRef = React.useRef(new Audio('background-music.mp3'));

  React.useEffect(() => {
    const colors = ['#ff6b6b', '#ffd60a', '#3abef9', '#ff86c2', '#a0d995'];
    for (let i = 0; i < 60; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.animationDelay = `${Math.random() * 6}s`;
      document.body.appendChild(confetti);
    }
  }, []);

  React.useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
      const diff = endOfDay - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${hours}ч ${minutes}м ${seconds}с`);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMusic = () => {
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => alert('Включите звук в браузере!'));
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const getGift = () => {
    setShowGiftModal(true);
  };

  const closeGiftModal = () => {
    setShowGiftModal(false);
  };

  const closeModal = (e) => {
    if (e.target.className.includes('modal') || e.target.tagName === 'BUTTON') {
      setSelectedImage(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4 relative z-10">
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-bold text-pink-600 pulse">
          С Днём Рождения, Лиза!
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mt-4">
          Моя дорогая Лиза, этот день особенный, потому что ты — моя самая важная часть! 🎉
        </p>
        <button
          onClick={toggleMusic}
          className="mt-4 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
        >
          {isMusicPlaying ? 'Пауза 🎶' : 'Включить музыку 🎶'}
        </button>
      </header>

      <section className="bg-white rounded-3xl shadow-2xl p-8 mb-12 w-full max-w-3xl">
        <h2 className="text-3xl font-semibold text-purple-600 mb-6">Поздравление от меня</h2>
        <p className="text-lg text-gray-600 mb-6">
          Лиза, ты — свет в моей жизни! От всего сердца желаю тебе счастья, здоровья и бесконечной любви. Пусть каждый момент с тобой будет таким же ярким, как этот день. Я так благодарен, что ты рядом! 💖
        </p>
        <div className="text-center">
          <p className="text-lg text-gray-600 font-semibold">С любовью, Стас:)</p>
        </div>
      </section>

      <section className="mb-12 w-full max-w-3xl">
        <h2 className="text-3xl font-semibold text-purple-600 mb-6 text-center">
          До конца праздника осталось:
        </h2>
        <p className="text-4xl font-bold text-pink-600 text-center">{timeLeft}</p>
      </section>

      <section className="mb-12 w-full max-w-3xl text-center">
        <button
          onClick={getGift}
          className="gift-button"
        >
          Получить подарок
        </button>
        {showGiftModal && (
          <div className="gift-modal">
            <p className="text-xl font-semibold text-purple-600 mb-4">🎁 Твой подарок ждёт тебя в Telegram!</p>
            <button
              onClick={closeGiftModal}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Закрыть
            </button>
          </div>
        )}
      </section>

      <section className="gallery grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl mb-12">
        <h2 className="text-3xl font-semibold text-purple-600 mb-6 text-center col-span-full">
          лучшие моменты
        </h2>
        {[
          'moment1.jpg',
          'moment2.jpg',
          'moment3.jpg',
          'moment4.jpg',
          'moment5.jpg',
          'moment6.jpg',
        ].map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Moment ${index + 1}`}
            className="rounded-lg shadow-lg cursor-pointer"
            onClick={() => setSelectedImage(src)}
          />
        ))}
      </section>

      {selectedImage && (
        <div className="modal fixed inset-0 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="modal-content">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl"
            >
              ×
            </button>
            <img src={selectedImage} alt="Selected" className="max-h-[80vh] max-w-[80vw] rounded-lg" />
          </div>
        </div>
      )}

      <footer className="mt-12 text-center text-gray-500 mb-8">
        <p>Сделано с любовью для Лизы 💖 | 2025</p>
      </footer>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
