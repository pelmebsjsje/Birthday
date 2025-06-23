const App = () => {
  const [wishes, setWishes] = React.useState(JSON.parse(localStorage.getItem('lizaWishes')) || []);
  const [newWish, setNewWish] = React.useState('');
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [timeLeft, setTimeLeft] = React.useState('');
  const [isMusicPlaying, setIsMusicPlaying] = React.useState(false);
  const audioRef = React.useRef(new Audio('background-music.mp3'));

  React.useEffect(() => {
    localStorage.setItem('lizaWishes', JSON.stringify(wishes));
  }, [wishes]);

  const handleWishSubmit = (e) => {
    e.preventDefault();
    if (newWish.trim()) {
      setWishes([...wishes, { text: newWish, id: Date.now() }]);
      setNewWish('');
    }
  };

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

  const sendGift = () => {
    alert('Виртуальный подарок отправлен Лизе! 🎁');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4 relative z-10">
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-bold text-pink-600 pulse">
          С Днём Рождения, Лиза!
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mt-4">
          Сегодня твой особенный день, и мы празднуем тебя! 🎉
        </p>
        <button
          onClick={toggleMusic}
          className="mt-4 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
        >
          {isMusicPlaying ? 'Пауза 🎶' : 'Включить музыку 🎶'}
        </button>
      </header>

      <section className="bg-white rounded-3xl shadow-2xl p-8 mb-12 w-full max-w-3xl">
        <h2 className="text-3xl font-semibold text-purple-600 mb-6">Поздравление</h2>
        <p className="text-lg text-gray-600 mb-6">
          Дорогая Лиза, ты — невероятная, яркая и вдохновляющая! Желаю тебе море счастья, любви, приключений и исполнения всех желаний! Пусть каждый день приносит радость, а этот День рождения станет началом нового, удивительного этапа! 💖
        </p>
        <div className="text-center">
          <p className="text-lg text-gray-600 font-semibold">С любовью, твои друзья</p>
        </div>
      </section>

      <section className="mb-12 w-full max-w-3xl">
        <h2 className="text-3xl font-semibold text-purple-600 mb-6 text-center">
          До конца праздника осталось:
        </h2>
        <p className="text-4xl font-bold text-pink-600 text-center">{timeLeft}</p>
      </section>

      <section className="mb-12 w-full max-w-3xl">
        <h2 className="text-3xl font-semibold text-purple-600 mb-6 text-center">
          Оставь своё пожелание!
        </h2>
        <form onSubmit={handleWishSubmit} className="flex flex-col items-center gap-4">
          <textarea
            value={newWish}
            onChange={(e) => setNewWish(e.target.value)}
            placeholder="Напиши своё пожелание для Лизы..."
            className="w-full h-32 p-4 rounded-lg border-2 border-pink-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Пожелание для Лизы"
          />
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            Отправить пожелание
          </button>
        </form>
        <div className="mt-8">
          {wishes.map((wish) => (
            <div key={wish.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
              <p className="text-gray-600">{wish.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12 w-full max-w-3xl">
        <h2 className="text-3xl font-semibold text-purple-600 mb-6 text-center">
          Отправь виртуальный подарок!
        </h2>
        <button
          onClick={sendGift}
          className="gift-button bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-8 rounded-lg transition duration-300 mx-auto block text-lg"
        >
          🎁 Подарить сюрприз!
        </button>
      </section>

      <section className="gallery grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl mb-12">
        <h2 className="text-3xl font-semibold text-purple-600 mb-6 text-center col-span-full">
          Наши лучшие моменты
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
        <div className="modal fixed inset-0 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg p-4">
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
