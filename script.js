const levels = {
      A1: [
        { en: "cat", ru: "кот" },
        { en: "dog", ru: "собака" },
        { en: "house", ru: "дом" },
        { en: "book", ru: "книга" },
        { en: "pen", ru: "ручка" },
        { en: "car", ru: "машина" },
        { en: "sun", ru: "солнце" },
        { en: "milk", ru: "молоко" },
        { en: "apple", ru: "яблоко" },
        { en: "school", ru: "школа" },
      ],
      A2: [
        { en: "friend", ru: "друг" },
        { en: "travel", ru: "путешествовать" },
        { en: "family", ru: "семья" },
        { en: "money", ru: "деньги" },
        { en: "weather", ru: "погода" },
        { en: "job", ru: "работа" },
        { en: "music", ru: "музыка" },
        { en: "movie", ru: "фильм" },
        { en: "train", ru: "поезд" },
        { en: "phone", ru: "телефон" },
      ],
      B1: [
        { en: "challenge", ru: "вызов" },
        { en: "confident", ru: "уверенный" },
        { en: "decide", ru: "решать" },
        { en: "future", ru: "будущее" },
        { en: "experience", ru: "опыт" },
        { en: "respect", ru: "уважение" },
        { en: "opinion", ru: "мнение" },
        { en: "honest", ru: "честный" },
        { en: "success", ru: "успех" },
        { en: "language", ru: "язык" },
      ],
      B2: [
        { en: "significant", ru: "значительный" },
        { en: "independent", ru: "независимый" },
        { en: "environment", ru: "окружающая среда" },
        { en: "solution", ru: "решение" },
        { en: "technology", ru: "технология" },
        { en: "economy", ru: "экономика" },
        { en: "challenge", ru: "проблема" },
        { en: "policy", ru: "политика" },
        { en: "communication", ru: "общение" },
        { en: "relationship", ru: "отношение" },
      ],
      C1: [
        { en: "approach", ru: "подход" },
        { en: "perspective", ru: "взгляд" },
        { en: "complex", ru: "сложный" },
        { en: "evaluate", ru: "оценивать" },
        { en: "impact", ru: "влияние" },
        { en: "strategy", ru: "стратегия" },
        { en: "alternative", ru: "альтернатива" },
        { en: "analysis", ru: "анализ" },
        { en: "assume", ru: "предполагать" },
        { en: "benefit", ru: "выгода" },
      ],
      C2: [
        { en: "ubiquitous", ru: "вездесущий" },
        { en: "notwithstanding", ru: "несмотря на" },
        { en: "paradigm", ru: "парадигма" },
        { en: "facetious", ru: "шуточный" },
        { en: "conundrum", ru: "головоломка" },
        { en: "juxtaposition", ru: "сопоставление" },
        { en: "idiosyncrasy", ru: "особенность" },
        { en: "ephemeral", ru: "мимолётный" },
        { en: "eloquent", ru: "красноречивый" },
        { en: "incongruous", ru: "нелепый" },
      ],
    };

    const card = document.getElementById("card");
    const front = document.getElementById("card-front");
    const back = document.getElementById("card-back");
    const levelSelect = document.getElementById("level-select");

    let currentLevel = "A1";
    let currentIndex = 0;

   function updateCard() {
  const word = levels[currentLevel][currentIndex];
  front.textContent = word.en; // Лицевая сторона: слово на английском
  back.textContent = word.ru; // Обратная сторона: перевод на русском
}



    function nextCard() {
      currentIndex = (currentIndex + 1) % levels[currentLevel].length;
      updateCard();
    }

    function prevCard() {
      currentIndex = (currentIndex - 1 + levels[currentLevel].length) % levels[currentLevel].length;
      updateCard();
    }

    function flipCard() {
      card.classList.toggle("flipped");
    }

    levelSelect.addEventListener("change", () => {
      currentLevel = levelSelect.value;
      currentIndex = 0;
      updateCard();
    });

let quizWords = [];

function startQuiz() {
  document.querySelector('.card-container').style.display = 'none';
  document.querySelector('.controls').style.display = 'none';
  document.getElementById('quiz').style.display = 'block';

  quizWords = [...levels[currentLevel]]; // копируем все слова
  shuffleArray(quizWords);
  loadQuiz();
}

function loadQuiz() {
  if (quizWords.length === 0) {
    document.getElementById("quiz-word").textContent = "🎉 Тест пройден!";
    document.getElementById("options").innerHTML = `
      <button onclick="startQuiz()">Пройти снова</button>
    `;
    return;
  }

  const word = quizWords.pop(); // берём следующее слово
  document.getElementById("quiz-word").textContent = word.en;

  let options = [word.ru];
  while (options.length < 4) {
    const random = levels[currentLevel][Math.floor(Math.random() * levels[currentLevel].length)].ru;
    if (!options.includes(random)) options.push(random);
  }

  shuffleArray(options);

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "quiz-option";
    btn.textContent = opt;
    btn.onclick = () => {
      if (opt === word.ru) {
        document.getElementById("quiz-feedback").textContent = "✅ Правильно!";
        setTimeout(() => {
          document.getElementById("quiz-feedback").textContent = "";
          loadQuiz();
        }, 800);
      } else {
        document.getElementById("quiz-feedback").textContent = "❌ Неправильно. Попробуй снова!";
      }
    };
    optionsDiv.appendChild(btn);
  });
}

// Утилита для перемешивания массива
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
function exitQuiz() {
  document.querySelector('.card-container').style.display = 'flex';
  document.querySelector('.controls').style.display = 'block';
  document.getElementById('quiz').style.display = 'none';
  currentIndex = 0;
  updateCard();
}

    updateCard();