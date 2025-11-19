const screens = document.querySelectorAll('[data-screen]');
const navMap = {
  'nav-home': 'menu-screen',
  'nav-behind': 'behind',
  'nav-team': 'team',
  'nav-contact': 'contact',
  'breadcrumb-home': 'menu-screen',
  'result-home': 'menu-screen',
  'behind-home': 'menu-screen',
  'team-home': 'menu-screen',
  'contact-home': 'menu-screen'
};

const elements = {
  startBtn: document.getElementById('startBtn'),
  breadcrumbStart: document.getElementById('breadcrumb-home'),
  launchQuizBtn: document.getElementById('launchQuizBtn'),
  timerGroup: document.getElementById('timerGroup'),
  categoryGroup: document.getElementById('categoryGroup'),
  questionGroup: document.getElementById('questionGroup'),
  quizScreen: document.getElementById('quiz'),
  quiz: {
    timer: document.getElementById('timer'),
    counter: document.getElementById('qCounter'),
    question: document.getElementById('question'),
    choices: document.getElementById('choices'),
    feedback: document.getElementById('feedback'),
    submitBtn: document.getElementById('submitBtn'),
    skipBtn: document.getElementById('skipBtn')
  },
  result: {
    screen: document.getElementById('result-screen'),
    score: document.getElementById('scoreText'),
    achievements: document.getElementById('achievementList'),
    tryAgain: document.getElementById('tryAgainBtn'),
    playAgain: document.getElementById('playAgainBtn'),
    adjust: document.getElementById('viewSetupBtn')
  }
};

const setupState = {
  timer: 5,
  category: null,
  total: null
};

let quizState = {
  questions: [],
  currentIndex: 0,
  score: 0,
  selectedChoice: null,
  awaitingAnswer: true,
  timerId: null,
  timeLeft: 0,
  fastAnswers: 0,
  skipped: 0
};

const mathQuestions = [
  { question: 'If 3x − 5 = 16, what is x?', choices: ['5', '6', '7', '8'], answer: '7' },
  { question: 'What is the square root of 196?', choices: ['12', '13', '14', '15'], answer: '14' },
  { question: 'A triangle has sides 6 cm, 8 cm, and 10 cm. What type of triangle is it?', choices: ['Right', 'Acute', 'Obtuse', 'Equilateral'], answer: 'Right' },
  { question: 'What is 45% of 220?', choices: ['89', '95', '99', '110'], answer: '99' },
  { question: 'Simplify: 4(3 + 2) − 6', choices: ['14', '18', '10', '12'], answer: '14' },
  { question: 'If y/3 = 9, what is y?', choices: ['12', '18', '21', '27'], answer: '27' },
  { question: 'How many degrees are in the sum of interior angles of a hexagon?', choices: ['540°', '600°', '720°', '900°'], answer: '720°' },
  { question: 'What is the value of 2³ × 2²?', choices: ['8', '12', '16', '32'], answer: '32' },
  { question: 'Solve: 7² − 4³', choices: ['1', '5', '9', '13'], answer: '1' },
  { question: 'If a rectangle has an area of 84 and a length of 12, what is its width?', choices: ['6', '7', '8', '9'], answer: '7' },
  { question: 'Find the missing number: 5, 9, 17, ?, 65', choices: ['29', '33', '35', '41'], answer: '33' },
  { question: 'What is the next prime number after 43?', choices: ['45', '47', '49', '51'], answer: '47' },
  { question: 'Evaluate: (6!)/(4!)', choices: ['12', '24', '30', '720'], answer: '30' },
  { question: 'Convert 0.375 to a fraction in simplest form.', choices: ['3/8', '5/16', '3/10', '7/16'], answer: '3/8' },
  { question: 'A shop applies a 20% discount to a ₱850 item. What is the sale price?', choices: ['₱650', '₱680', '₱700', '₱720'], answer: '₱680' },
  { question: 'The ratio of cats to dogs is 3:5. If there are 30 dogs, how many cats?', choices: ['12', '15', '18', '24'], answer: '18' },
  { question: 'What is the median of 4, 9, 15, 21, 33?', choices: ['9', '15', '21', '33'], answer: '15' },
  { question: 'Solve for n: n² = 169.', choices: ['11', '12', '13', '14'], answer: '13' },
  { question: 'If a car travels 180 km in 3 hours, what is its speed?', choices: ['45 km/h', '50 km/h', '55 km/h', '60 km/h'], answer: '60 km/h' },
  { question: 'What is the value of π rounded to two decimal places?', choices: ['3.12', '3.14', '3.16', '3.18'], answer: '3.14' }
];

const logicQuestions = [
  { question: 'I speak without a mouth and hear without ears. What am I?', choices: ['Echo', 'Robot', 'Shadow', 'Cloud'], answer: 'Echo' },
  { question: 'What comes once in a minute, twice in a moment, but never in a thousand years?', choices: ['The letter M', 'Leap year', 'Comet', 'Sunrise'], answer: 'The letter M' },
  { question: 'A farmer has 17 sheep and all but 9 die. How many are left?', choices: ['0', '8', '9', '17'], answer: '9' },
  { question: 'Which weighs more: a pound of feathers or a pound of bricks?', choices: ['Feathers', 'Bricks', 'Same weight', 'Depends on wind'], answer: 'Same weight' },
  { question: 'If you have me, you want to share me. If you share me, you don’t have me. What am I?', choices: ['Secret', 'Money', 'Time', 'Friend'], answer: 'Secret' },
  { question: 'You see me once in June, twice in November, but not in May. What am I?', choices: ['The letter E', 'Full moon', 'Vacation', 'Rain'], answer: 'The letter E' },
  { question: 'I’m tall when I’m young, and short when I’m old. What am I?', choices: ['Tree', 'Pencil', 'Candle', 'Mountain'], answer: 'Candle' },
  { question: 'What can run but never walks, has a mouth but never talks?', choices: ['River', 'Clock', 'Cloud', 'Wind'], answer: 'River' },
  { question: 'Two fathers and two sons sit to eat. They eat exactly three slices of pizza and each person has one slice. How?', choices: ['They share slices', 'One is grandfather', 'They eat fast', 'They order more'], answer: 'One is grandfather' },
  { question: 'The more of this there is, the less you see. What is it?', choices: ['Light', 'Fog', 'Darkness', 'Snow'], answer: 'Darkness' },
  { question: 'What starts with T, ends with T, and has T in it?', choices: ['Tent', 'Teapot', 'Turtle', 'Tomcat'], answer: 'Teapot' },
  { question: 'I have branches but no fruit, trunk, or leaves. What am I?', choices: ['Bank', 'River', 'Library', 'Computer'], answer: 'Bank' },
  { question: 'Feed me and I live, yet give me a drink and I die. What am I?', choices: ['Fire', 'Plant', 'Metal', 'Robot'], answer: 'Fire' },
  { question: 'What goes up but never comes back down?', choices: ['Smoke', 'Age', 'Balloon', 'Rain'], answer: 'Age' },
  { question: 'I have keys but no locks. I have space but no rooms. You can enter but not go outside. What am I?', choices: ['Keyboard', 'Map', 'Phone', 'Car'], answer: 'Keyboard' },
  { question: 'What is always in front of you but can’t be seen?', choices: ['Future', 'Air', 'Glass', 'Dream'], answer: 'Future' },
  { question: 'You measure my life in hours and I serve you by expiring. What am I?', choices: ['Battery', 'Candle', 'Clock', 'Phone'], answer: 'Candle' },
  { question: 'What has many teeth but can’t bite?', choices: ['Comb', 'Gear', 'Saw', 'Zipper'], answer: 'Comb' },
  { question: 'What gets wetter the more it dries?', choices: ['Towel', 'River', 'Cloud', 'Shirt'], answer: 'Towel' },
  { question: 'If you drop me I’m sure to crack, but give me a smile and I’ll smile back. What am I?', choices: ['Mirror', 'Ice', 'Phone', 'Glass'], answer: 'Mirror' }
];

const cartoonQuestions = [
  { question: 'Which town does SpongeBob SquarePants live in?', choices: ['Bikini Bottom', 'Atlantis', 'Beach City', 'Toon Town'], answer: 'Bikini Bottom' },
  { question: 'In Adventure Time, what is the name of the shape-shifting dog?', choices: ['Jake', 'Finn', 'BMO', 'Ice King'], answer: 'Jake' },
  { question: 'Which element does Aang master last in Avatar: The Last Airbender?', choices: ['Water', 'Earth', 'Fire', 'Air'], answer: 'Fire' },
  { question: 'Who owns the Krusty Krab in SpongeBob SquarePants?', choices: ['Mr. Krabs', 'Squidward', 'Plankton', 'Pearl'], answer: 'Mr. Krabs' },
  { question: 'What is Courage in Courage the Cowardly Dog?', choices: ['A dog', 'A cat', 'A rabbit', 'A mouse'], answer: 'A dog' },
  { question: 'Which gem is the leader in Steven Universe?', choices: ['Garnet', 'Pearl', 'Amethyst', 'Peridot'], answer: 'Garnet' },
  { question: 'Who is the villainous genius in Phineas and Ferb?', choices: ['Dr. Doofenshmirtz', 'Perry', 'Candace', 'Buford'], answer: 'Dr. Doofenshmirtz' },
  { question: 'What is Scooby-Doo’s favorite treat?', choices: ['Scooby Snacks', 'Dog Bones', 'Cookies', 'Pizza'], answer: 'Scooby Snacks' },
  { question: 'In Gravity Falls, who is Dipper’s twin sister?', choices: ['Mabel', 'Wendy', 'Pacifica', 'Candy'], answer: 'Mabel' },
  { question: 'Which magical item chooses the new Avatar?', choices: ['There is no item', 'Spirit Pearl', 'Elemental Stone', 'Moon Crystal'], answer: 'There is no item' },
  { question: 'Who was Naruto’s first teacher after graduation?', choices: ['Iruka', 'Kakashi', 'Jiraiya', 'Asuma'], answer: 'Iruka' },
  { question: 'What village does Naruto belong to?', choices: ['Hidden Leaf', 'Hidden Sand', 'Hidden Rain', 'Hidden Mist'], answer: 'Hidden Leaf' },
  { question: 'Which ninja clan is famous for the Sharingan?', choices: ['Uchiha', 'Hyuga', 'Nara', 'Akimichi'], answer: 'Uchiha' },
  { question: 'Who founded the Akatsuki?', choices: ['Nagato', 'Itachi', 'Obito', 'Sasori'], answer: 'Nagato' },
  { question: 'What is the name of Naruto’s signature move?', choices: ['Rasengan', 'Chidori', 'Byakugan', 'Raikiri'], answer: 'Rasengan' },
  { question: 'Who becomes the Fifth Hokage?', choices: ['Tsunade', 'Kakashi', 'Jiraiya', 'Danzo'], answer: 'Tsunade' },
  { question: 'What is the tailed beast sealed inside Gaara?', choices: ['One-Tail Shukaku', 'Two-Tails Matatabi', 'Nine-Tails Kurama', 'Eight-Tails Gyuki'], answer: 'One-Tail Shukaku' },
  { question: 'Which team includes Naruto, Sasuke, and Sakura?', choices: ['Team 7', 'Team 10', 'Team Guy', 'Team Sand'], answer: 'Team 7' },
  { question: 'Who is known as the Copy Ninja?', choices: ['Kakashi', 'Guy', 'Shikamaru', 'Killer Bee'], answer: 'Kakashi' },
  { question: 'What exam do young ninja take to become chunin?', choices: ['Chunin Exams', 'Jonin Trials', 'Academy Test', 'Forest Challenge'], answer: 'Chunin Exams' }
];

const questionBank = {
  math: mathQuestions,
  logic: logicQuestions,
  cartoon: cartoonQuestions
};

function showScreen(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;
  screens.forEach((section) => {
    if (section.id === targetId) {
      section.classList.remove('hidden');
      requestAnimationFrame(() => section.classList.add('show'));
    } else {
      section.classList.remove('show');
      section.classList.add('hidden');
    }
  });
  updateNavActive(targetId);
}

function updateNavActive(targetId) {
  const navButtons = document.querySelectorAll('.nav button');
  navButtons.forEach((btn) => btn.classList.remove('active'));
  const mapping = {
    'menu-screen': 'nav-home',
    'behind': 'nav-behind',
    'team': 'nav-team',
    'contact': 'nav-contact'
  };
  const activeBtn = document.getElementById(mapping[targetId]);
  if (activeBtn) activeBtn.classList.add('active');
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function handleNavClicks() {
  Object.entries(navMap).forEach(([btnId, screenId]) => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener('click', () => showScreen(screenId));
    }
  });
}

function attachSelectionHandlers() {
  elements.startBtn.addEventListener('click', () => showScreen('game-select'));

  elements.timerGroup.querySelectorAll('.pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      setupState.timer = Number(pill.dataset.timer);
      setActiveState(elements.timerGroup, pill);
    });
  });

  elements.categoryGroup.querySelectorAll('.card-option').forEach((option) => {
    option.addEventListener('click', () => {
      setupState.category = option.dataset.category;
      setActiveState(elements.categoryGroup, option);
      validateLaunch();
    });
  });

  elements.questionGroup.querySelectorAll('.pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      setupState.total = Number(pill.dataset.total);
      setActiveState(elements.questionGroup, pill);
      validateLaunch();
    });
  });

  elements.launchQuizBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!elements.launchQuizBtn.disabled) {
      startQuiz();
    }
  });
}

function setActiveState(container, activeElement) {
  container.querySelectorAll('.pill, .card-option').forEach((el) => el.classList.remove('active'));
  activeElement.classList.add('active');
}

function validateLaunch() {
  const ready = Boolean(setupState.category && setupState.total);
  elements.launchQuizBtn.disabled = !ready;
  elements.launchQuizBtn.classList.toggle('disabled', !ready);
}

function resetQuizState() {
  quizState = {
    questions: [],
    currentIndex: 0,
    score: 0,
    selectedChoice: null,
    awaitingAnswer: true,
    timerId: null,
    timeLeft: setupState.timer,
    fastAnswers: 0,
    skipped: 0
  };
}

function startQuiz() {
  resetQuizState();
  const pool = questionBank[setupState.category];
  quizState.questions = shuffle(pool).slice(0, setupState.total);
  showScreen('quiz');
  renderQuestion();
}

function renderQuestion() {
  clearInterval(quizState.timerId);
  quizState.selectedChoice = null;
  quizState.awaitingAnswer = true;
  elements.quiz.feedback.textContent = '';
  elements.quiz.feedback.className = 'feedback';
  elements.quiz.submitBtn.textContent = quizState.currentIndex === quizState.questions.length - 1 ? 'Submit' : 'Submit';
  elements.quiz.submitBtn.disabled = true;
  elements.quiz.submitBtn.classList.add('disabled');
  elements.quiz.skipBtn.disabled = false;

  const current = quizState.questions[quizState.currentIndex];
  elements.quiz.counter.textContent = `Question ${quizState.currentIndex + 1}/${quizState.questions.length}`;
  elements.quiz.question.textContent = current.question;
  renderChoices(current);
  startTimer();
}

function renderChoices(question) {
  elements.quiz.choices.innerHTML = '';
  shuffle(question.choices).forEach((choiceText, idx) => {
    const label = document.createElement('label');
    label.className = 'choice';
    label.innerHTML = `
      <input type="radio" name="choice" value="${choiceText}">
      <span>${choiceText}</span>
    `;
    label.addEventListener('click', () => selectChoice(choiceText, idx));
    elements.quiz.choices.appendChild(label);
  });
}

function selectChoice(choiceText, idx) {
  if (!quizState.awaitingAnswer) return;
  quizState.selectedChoice = choiceText;
  elements.quiz.choices.querySelectorAll('.choice').forEach((choice, i) => {
    choice.classList.toggle('selected', i === idx);
  });
  elements.quiz.submitBtn.disabled = false;
  elements.quiz.submitBtn.classList.remove('disabled');
}

function startTimer() {
  quizState.timeLeft = setupState.timer;
  updateTimerUI();
  quizState.timerId = setInterval(() => {
    quizState.timeLeft -= 1;
    updateTimerUI();
    if (quizState.timeLeft <= 0) {
      clearInterval(quizState.timerId);
      handleTimeExpired();
    }
  }, 1000);
}

function updateTimerUI() {
  elements.quiz.timer.textContent = `${Math.max(quizState.timeLeft, 0)}s`;
  elements.quiz.timer.classList.toggle('warning', quizState.timeLeft <= 5);
}

function handleTimeExpired() {
  if (!quizState.awaitingAnswer) return;
  quizState.awaitingAnswer = false;
  lockChoices();
  elements.quiz.feedback.textContent = 'Time\'s up! No points awarded.';
  elements.quiz.feedback.classList.add('wrong');
  elements.quiz.skipBtn.disabled = true;
  elements.quiz.submitBtn.textContent = quizState.currentIndex === quizState.questions.length - 1 ? 'See Results' : 'Next Question';
  elements.quiz.submitBtn.disabled = false;
  elements.quiz.submitBtn.classList.remove('disabled');
}

function lockChoices() {
  elements.quiz.choices.querySelectorAll('.choice').forEach((choice) => {
    choice.classList.add('disabled');
  });
}

elements.quiz.submitBtn.addEventListener('click', () => {
  if (quizState.awaitingAnswer) {
    evaluateAnswer();
  } else {
    nextStep();
  }
});

elements.quiz.skipBtn.addEventListener('click', () => {
  quizState.skipped += 1;
  clearInterval(quizState.timerId);
  elements.quiz.feedback.textContent = 'Skipped! Moving to the next question.';
  elements.quiz.feedback.classList.remove('wrong', 'correct');
  elements.quiz.feedback.classList.add('wrong');
  quizState.awaitingAnswer = false;
  lockChoices();
  elements.quiz.submitBtn.textContent = 'Next Question';
  elements.quiz.submitBtn.disabled = false;
  elements.quiz.submitBtn.classList.remove('disabled');
  elements.quiz.skipBtn.disabled = true;
});

function evaluateAnswer() {
  if (!quizState.selectedChoice) return;
  const current = quizState.questions[quizState.currentIndex];
  clearInterval(quizState.timerId);
  quizState.awaitingAnswer = false;
  lockChoices();
  const correct = quizState.selectedChoice === current.answer;
  if (correct) {
    quizState.score += 1;
    if (quizState.timeLeft > setupState.timer / 2) {
      quizState.fastAnswers += 1;
    }
    elements.quiz.feedback.textContent = 'Correct! Nice work.';
    elements.quiz.feedback.classList.add('correct');
  } else {
    elements.quiz.feedback.textContent = `Wrong! Correct answer: ${current.answer}`;
    elements.quiz.feedback.classList.add('wrong');
  }
  elements.quiz.skipBtn.disabled = true;
  elements.quiz.submitBtn.textContent = quizState.currentIndex === quizState.questions.length - 1 ? 'See Results' : 'Next Question';
}

function nextStep() {
  if (quizState.currentIndex >= quizState.questions.length - 1) {
    finishQuiz();
  } else {
    quizState.currentIndex += 1;
    renderQuestion();
  }
}

function finishQuiz() {
  showScreen('result-screen');
  elements.result.score.textContent = `You scored ${quizState.score} out of ${quizState.questions.length}.`;
  renderAchievements();
}

function renderAchievements() {
  const achievements = [];
  achievements.push({ title: 'Finisher', desc: 'Completed a full quiz run.' });

  if (quizState.score === quizState.questions.length) {
    achievements.push({ title: 'Perfect Brain', desc: 'Answered everything flawlessly.' });
  } else if (quizState.score / quizState.questions.length >= 0.8) {
    achievements.push({ title: 'Sharp Shooter', desc: 'Cleared at least 80% of questions.' });
  }

  if (quizState.fastAnswers >= Math.ceil(quizState.questions.length / 2)) {
    achievements.push({ title: 'Quick Reflex', desc: 'Answered half the questions with time to spare.' });
  }

  if (quizState.skipped === 0) {
    achievements.push({ title: 'No Hesitation', desc: 'Never pressed the skip button.' });
  }

  if (achievements.length === 1) {
    achievements.push({ title: 'Keep Going', desc: 'Every run improves your streak.' });
  }

  elements.result.achievements.innerHTML = achievements.map(
    (item) => `<article class="achievement-card"><h4>${item.title}</h4><p>${item.desc}</p></article>`
  ).join('');
}

function attachResultHandlers() {
  elements.result.tryAgain.addEventListener('click', () => showScreen('game-select'));
  elements.result.adjust.addEventListener('click', () => showScreen('game-select'));
  elements.result.playAgain.addEventListener('click', () => {
    if (setupState.category && setupState.total) {
      startQuiz();
    } else {
      showScreen('game-select');
    }
  });
}

function initialize() {
  handleNavClicks();
  attachSelectionHandlers();
  attachResultHandlers();
  validateLaunch();
  updateNavActive('menu-screen');
}

document.addEventListener('DOMContentLoaded', initialize);
