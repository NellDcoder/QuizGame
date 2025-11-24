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
    submitBtn: document.getElementById('submitBtn')
  },
  result: {
    screen: document.getElementById('result-screen'),
    score: document.getElementById('scoreText'),
    achievements: document.getElementById('achievementList'),
    tryAgain: document.getElementById('tryAgainBtn'),
    playAgain: document.getElementById('playAgainBtn')
  }
};

const setupState = {
  timer: 10,
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
  autoAdvanceTimer: null,
  popupTimer: null,
  timeLeft: 0,
  fastAnswers: 0,
  skipped: 0
};
const mathQuestions = [
  { question: "If 3x − 5 = 16, what is x?", choices: ["5", "6", "7", "8"], answer: "7" },
  { question: "What is the square root of 196?", choices: ["12", "13", "14", "15"], answer: "14" },
  { question: "What is 8 + 5?", choices: ["12", "13", "14", "15"], answer: "13" },
  { question: "What is 9 − 4?", choices: ["5", "6", "7", "4"], answer: "5" },
  { question: "If you have 3 apples and get 2 more, how many apples do you have?", choices: ["4", "5", "6", "3"], answer: "5" },
  { question: "I am a number. Double me and add 6, you get 14. What number am I?", choices: ["2", "3", "4", "5"], answer: "4" },
  { question: "What is 7 × 3?", choices: ["20", "21", "24", "18"], answer: "21" },
  { question: "What is 20 ÷ 4?", choices: ["4", "5", "6", "8"], answer: "5" },
  { question: "If you have 10 candies and eat 3, how many are left?", choices: ["7", "6", "8", "5"], answer: "7" },
  { question: "I am thinking of a number. If I subtract 5 from it, I get 10. What is the number?", choices: ["10", "15", "5", "12"], answer: "15" }
];

const logicQuestions = [
  { question: "I speak without a mouth and hear without ears. What am I?", choices: ["Echo", "Robot", "Shadow", "Cloud"], answer: "Echo" },
  { question: "What comes once in a minute, twice in a moment, but never in a thousand years?", choices: ["The letter M", "Leap year", "Comet", "Sunrise"], answer: "The letter M" },
  { question: "I’m tall when I’m young and short when I’m old. What am I?", choices: ["Candle", "Tree", "Pencil", "Mountain"], answer: "Candle" },
  { question: "What has keys but can’t open locks?", choices: ["Piano", "Map", "Book", "Car"], answer: "Piano" },
  { question: "What has hands but can’t clap?", choices: ["Clock", "Monkey", "Robot", "Doll"], answer: "Clock" },
  { question: "I’m always running but never move. What am I?", choices: ["Clock", "River", "Fan", "Shoes"], answer: "River" },
  { question: "What has a head, a tail, but no body?", choices: ["Coin", "Snake", "Arrow", "Comet"], answer: "Coin" },
  { question: "The more of me you take, the more you leave behind. What am I?", choices: ["Footsteps", "Time", "Water", "Air"], answer: "Footsteps" },
  { question: "What can travel around the world while staying in a corner?", choices: ["Stamp", "Airplane", "Letter", "Sun"], answer: "Stamp" },
  { question: "I have branches, but no fruit, trunk, or leaves. What am I?", choices: ["Bank", "River", "Road", "Library"], answer: "Bank" }
];

const cartoonQuestions = [
  { question: "Which town does SpongeBob SquarePants live in?", choices: ["Bikini Bottom", "Atlantis", "Beach City", "Toon Town"], answer: "Bikini Bottom" },
  { question: "Which ninja clan is famous for the Sharingan?", choices: ["Uchiha", "Hyuga", "Nara", "Akimichi"], answer: "Uchiha" },
  { question: "What kind of animal is Mickey Mouse?", choices: ["Mouse", "Dog", "Cat", "Rabbit"], answer: "Mouse" },
  { question: "In 'Tom and Jerry', who is the cat?", choices: ["Tom", "Jerry", "Spike", "Butch"], answer: "Tom" },
  { question: "Who lives in a pineapple under the sea?", choices: ["SpongeBob", "Patrick", "Squidward", "Mr. Krabs"], answer: "SpongeBob" },
  { question: "Which cartoon features a boy genius with a secret lab?", choices: ["Dexter's Laboratory", "Jimmy Neutron", "Phineas and Ferb", "Pinky and the Brain"], answer: "Dexter's Laboratory" },
  { question: "What is the name of the dog in 'Scooby-Doo'?", choices: ["Scooby-Doo", "Shaggy", "Scrappy", "Spike"], answer: "Scooby-Doo" },
  { question: "Which cartoon character says 'What's up, Doc?'", choices: ["Bugs Bunny", "Daffy Duck", "Elmer Fudd", "Porky Pig"], answer: "Bugs Bunny" },
  { question: "Who is SpongeBob's best friend?", choices: ["Patrick Star", "Squidward Tentacles", "Mr. Krabs", "Sandy Cheeks"], answer: "Patrick Star" },
  { question: "Which superhero is also known as the Boy Scout?", choices: ["Superman", "Batman", "Spider-Man", "Flash"], answer: "Superman" }
];

const generalQuestions = [
  { question: "What is the largest planet in our solar system?", choices: ["Jupiter", "Earth", "Mars", "Saturn"], answer: "Jupiter" },
  { question: "Which animal is known as the King of the Jungle?", choices: ["Tiger", "Elephant", "Lion", "Bear"], answer: "Lion" },
  { question: "What do bees collect and use to make honey?", choices: ["Water", "Nectar", "Leaves", "Seeds"], answer: "Nectar" },
  { question: "Which ocean is the biggest?", choices: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"], answer: "Pacific Ocean" },
  { question: "How many days are in a leap year?", choices: ["365", "366", "364", "360"], answer: "366" },
  { question: "What is the tallest animal in the world?", choices: ["Elephant", "Kangaroo", "Giraffe", "Camel"], answer: "Giraffe" },
  { question: "Which Disney movie features a princess named Ariel?", choices: ["Frozen", "The Little Mermaid", "Moana", "Tangled"], answer: "The Little Mermaid" },
  { question: "What color are Smurfs?", choices: ["Blue", "Green", "Purple", "Yellow"], answer: "Blue" },
  { question: "Which fruit is known for keeping doctors away?", choices: ["Banana", "Orange", "Apple", "Grapes"], answer: "Apple" },
  { question: "What do you call a baby dog?", choices: ["Kitten", "Puppy", "Cub", "Calf"], answer: "Puppy" }
];

const bank = { 
  math: mathQuestions, 
  logic: logicQuestions, 
  cartoon: cartoonQuestions,
  general: generalQuestions
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
      btn.addEventListener('click', () => {
        showScreen(screenId);
        
        const nav = document.querySelector('.nav');
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
        }
      });
    }
  });
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const nav = document.querySelector('.nav');
      nav.classList.toggle('open');
    });
  }
  document.addEventListener('click', (e) => {
    const nav = document.querySelector('.nav');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target) && nav.classList.contains('open')) {
      nav.classList.remove('open');
    }
  });
}

function handleChangelogs() {
  const changelogsBtn = document.getElementById('changelogsBtn');
  const closeBtn = document.getElementById('closeChangelogs');
  const overlay = document.getElementById('changelogsOverlay');

  if (changelogsBtn) {
    changelogsBtn.addEventListener('click', () => {
      const currentScreen = document.querySelector('[data-screen]:not(.hidden)');
      if (currentScreen && currentScreen.id === 'menu-screen') {
        showChangelogsOverlay();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', hideChangelogsOverlay);
  }
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        hideChangelogsOverlay();
      }
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay && !overlay.classList.contains('hidden')) {
      hideChangelogsOverlay();
    }
  });
}

function showChangelogsOverlay() {
  const overlay = document.getElementById('changelogsOverlay');
  if (overlay) {
    overlay.classList.remove('hidden');
  }
}

function hideChangelogsOverlay() {
  const overlay = document.getElementById('changelogsOverlay');
  if (overlay) {
    overlay.classList.add('hidden');
  }
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
  const pool = bank[setupState.category] || [];
  quizState.questions = shuffle(pool).slice(0, setupState.total);
  showScreen('quiz');
  renderQuestion();
}

function renderQuestion() {
  clearInterval(quizState.timerId);
  clearTimeout(quizState.autoAdvanceTimer);
  clearTimeout(quizState.popupTimer);
  quizState.autoAdvanceTimer = null;
  quizState.popupTimer = null;
  quizState.selectedChoice = null;
  quizState.awaitingAnswer = true;
  
  if (elements.quiz.feedback) { elements.quiz.feedback.textContent = ''; elements.quiz.feedback.className = 'feedback'; }
  elements.quiz.submitBtn.textContent = 'Submit';
  elements.quiz.submitBtn.disabled = true;
  elements.quiz.submitBtn.classList.add('disabled');

  const tf = document.getElementById('topFeedback');
  if (tf) { tf.className = 'top-feedback'; tf.setAttribute('aria-hidden', 'true'); }

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

  if (elements.quiz.timer) elements.quiz.timer.style.visibility = 'visible';
  quizState.timeLeft = setupState.timer;
  updateTimerUI();
  clearInterval(quizState.timerId);
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
 
  elements.quiz.timer.classList.toggle('warning', quizState.timeLeft > 0 && quizState.timeLeft <= 5);
  if (quizState.timeLeft <= 0) {
    elements.quiz.timer.classList.remove('warning');

    elements.quiz.timer.style.visibility = 'hidden';
  } else {
    elements.quiz.timer.style.visibility = 'visible';
  }
}

function handleTimeExpired() {
  if (!quizState.awaitingAnswer) return;
  quizState.awaitingAnswer = false;
  lockChoices();
  const current = quizState.questions[quizState.currentIndex];
  const msg = `Wrong! Correct answer: ${current.answer}`;
  if (elements.quiz.feedback) { elements.quiz.feedback.textContent = msg; elements.quiz.feedback.classList.add('wrong'); }
  highlightCorrect(current.answer);
  showTopFeedback(msg, 'wrong');
  elements.quiz.submitBtn.disabled = true;
  elements.quiz.submitBtn.classList.add('disabled');
  clearTimeout(quizState.autoAdvanceTimer);
  quizState.autoAdvanceTimer = setTimeout(() => {
    nextStep();
  }, 2500);
}

function lockChoices() {
  elements.quiz.choices.querySelectorAll('.choice').forEach((choice) => {
    choice.classList.add('disabled');
  });
}
elements.quiz.submitBtn.addEventListener('click', () => {
  const text = (elements.quiz.submitBtn.textContent || '').toLowerCase();
  const isNext = text.includes('next');
  if (isNext && !elements.quiz.submitBtn.disabled) {
    nextStep();
    return;
  }
  if (quizState.awaitingAnswer) {
    evaluateAnswer();
  }
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
    playCorrectConfetti();
    if (quizState.timeLeft > setupState.timer / 2) {
      quizState.fastAnswers += 1;
    }
    const msg = 'Correct! Nice work.';
    if (elements.quiz.feedback) { elements.quiz.feedback.textContent = msg; elements.quiz.feedback.classList.add('correct'); }
    highlightCorrect(current.answer);
    showTopFeedback(msg, 'correct');
  } else {
    if (elements.quiz.feedback) { elements.quiz.feedback.textContent = `Wrong! Correct answer: ${current.answer}`; elements.quiz.feedback.classList.add('wrong'); }
    highlightCorrect(current.answer);
    playWrongEffects();
    showTopFeedback(`Wrong! Correct answer: ${current.answer}`, 'wrong');
  }
  elements.quiz.submitBtn.disabled = true;
  elements.quiz.submitBtn.classList.add('disabled');
  clearTimeout(quizState.autoAdvanceTimer);
  quizState.autoAdvanceTimer = setTimeout(() => {
    nextStep();
  }, 2500);
}
function highlightCorrect(answerText) {
  const choices = elements.quiz.choices.querySelectorAll('.choice');
  choices.forEach((choice) => {
    const span = choice.querySelector('span');
    if (span && span.textContent.trim() === answerText) {
      choice.classList.add('correct');
      choice.classList.remove('selected');
    }
  });
}
function showTopFeedback(text, cls) {
  const el = document.getElementById('topFeedback');
  if (!el) return;
  if (quizState.popupTimer) {
    clearTimeout(quizState.popupTimer);
    quizState.popupTimer = null;
  }
  el.textContent = text;
  el.className = `top-feedback visible ${cls || ''}`;
  el.setAttribute('aria-hidden', 'false');
  quizState.popupTimer = setTimeout(() => {
    el.classList.add('fade-out');
    setTimeout(() => {
      el.className = 'top-feedback';
      el.setAttribute('aria-hidden', 'true');
    }, 450);
  }, 5000);
}
function nextStep() {
  clearTimeout(quizState.autoAdvanceTimer);
  clearTimeout(quizState.popupTimer);
  quizState.autoAdvanceTimer = null;
  quizState.popupTimer = null;
  if (quizState.currentIndex >= quizState.questions.length - 1) {
    finishQuiz();
  } else {
    quizState.currentIndex += 1;
    renderQuestion();
  }
}
function finishQuiz() {
  showScreen('result-screen');
  const points = quizState.score * 10;
  let greeting = '';
  if (quizState.score === quizState.questions.length) greeting = '🎉 Perfect Score! Amazing work.';
  elements.result.score.textContent = `You scored ${quizState.score} out of ${quizState.questions.length}. Points: ${points}. ${greeting}`;
  renderAchievements();
}
function renderAchievements() {
  const templates = {
    completion: { key: 'completion', title: 'Completionist', desc: 'Completed a full quiz run.' },
    perfect_math: { key: 'perfect_math', title: 'Perfect Math', desc: 'Perfect score on Math category.' },
    perfect_logic: { key: 'perfect_logic', title: 'Perfect Logic', desc: 'Perfect score on Logic category.' },
    perfect_cartoon: { key: 'perfect_cartoon', title: 'Perfect Cartoon', desc: 'Perfect score on Cartoon & Anime.' },
    perfect_general: { key: 'perfect_general', title: 'Perfect Generalist', desc: 'Perfect score on General Questions.' },
    quick_reflex: { key: 'quick_reflex', title: 'Quick Reflex', desc: 'Answered many questions quickly.' },
    no_skips: { key: 'no_skips', title: 'No Hesitation', desc: 'Never used the skip button.' },
    high_scorer: { key: 'high_scorer', title: 'High Scorer', desc: 'Scored at least 80%.' },
    streak: { key: 'streak', title: 'Streak Starter', desc: 'Scored 3 or more points.' },
    lucky_ten: { key: 'lucky_ten', title: 'Lucky Ten', desc: 'Strong result on a 10-question run.' }
  };
  const earnedKeys = new Set();
  const add = (key) => { if (key && templates[key] && !earnedKeys.has(key)) earnedKeys.add(key); };
  add('completion');
  if (quizState.score === quizState.questions.length) add(`perfect_${setupState.category}`);
  if (quizState.fastAnswers >= Math.ceil(quizState.questions.length / 2)) add('quick_reflex');
  if (quizState.skipped === 0) add('no_skips');
  if (quizState.score / quizState.questions.length >= 0.8) add('high_scorer');
  if (quizState.score >= 3) add('streak');
  if (quizState.questions.length === 10 && quizState.score >= 7) add('lucky_ten');

  if (earnedKeys.size === 1) add('streak');
  const order = ['completion', `perfect_${setupState.category}`, 'quick_reflex', 'no_skips', 'high_scorer', 'streak', 'lucky_ten'];
  const out = [];
  order.forEach((k) => { if (earnedKeys.has(k) && templates[k]) out.push(templates[k]); });

  if (out.length === 0) {
    earnedKeys.forEach((k) => { if (templates[k]) out.push(templates[k]); });
  }
  if (out.length > 0) {
    const achievement = out[0];
    elements.result.achievements.innerHTML = `<article class="achievement-card"><h4>${achievement.title}</h4><p>${achievement.desc}</p></article>`;
  } else {
    elements.result.achievements.innerHTML = '';
  }
}
function attachResultHandlers() {
  if (elements.result.tryAgain) {
    elements.result.tryAgain.addEventListener('click', () => showScreen('game-select'));
  }
  elements.result.playAgain.addEventListener('click', () => {
    showScreen('game-select');
  });
}
function initialize() {
  handleNavClicks();
  handleChangelogs();
  attachSelectionHandlers();
  attachResultHandlers();
  validateLaunch();
  updateNavActive('menu-screen');
  const timerPill = elements.timerGroup.querySelector(`.pill[data-timer="${setupState.timer}"]`);
  if (timerPill) setActiveState(elements.timerGroup, timerPill);
}
document.addEventListener('DOMContentLoaded', initialize);
function playCorrectConfetti() {
  confetti({
    particleCount: 120,
    spread: 70,
    origin: { y: 0.6 }
  });
}

function playWrongEffects() {
  const screen = document.getElementById('quiz');
  if (!screen) return;

  screen.classList.add('shake', 'wrong-flash');

  setTimeout(() => {
    screen.classList.remove('shake', 'wrong-flash');
  }, 600);
}

function playSkipFlash() {
  const screen = document.getElementById('quiz');
  if (!screen) return;

  screen.classList.add('skip-flash');

  setTimeout(() => {
    screen.classList.remove('skip-flash');
  }, 500);
}
