// Array of objects storing quiz data
const quizData = [
  {
    question: "Which HTML tag is used to link an external JavaScript file?",
    options: ["<script>", "<js>", "<javascript>", "<link>"],
    answer: 0
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["text-style", "font-size", "text-size", "font-weight"],
    answer: 1
  },
  {
    question: "How do you declare a constant variable in JavaScript?",
    options: ["var", "let", "const", "constant"],
    answer: 2
  },
  {
    question: "Which AWS service is best for hosting static websites?",
    options: ["Amazon EC2", "Amazon RDS", "Amazon S3", "AWS Lambda"],
    answer: 2
  }
];

// State variables
let currentQuestion = 0;
let userAnswers = new Array(quizData.length).fill(null);

// DOM Elements
const questionNumberEl = document.getElementById("question-number");
const scoreTrackerEl = document.getElementById("score-tracker");
const questionTextEl = document.getElementById("question-text");
const optionsContainerEl = document.getElementById("options-container");
const feedbackTextEl = document.getElementById("feedback-text");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const finalScoreEl = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");

// Calculate total score dynamically
function calculateScore() {
  let score = 0;
  userAnswers.forEach((answer, index) => {
    if (answer === quizData[index].answer) {
      score++;
    }
  });
  return score;
}

// Render the current question
function loadQuestion() {
  const currentData = quizData[currentQuestion];
  questionNumberEl.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
  scoreTrackerEl.textContent = `Score: ${calculateScore()}`;
  questionTextEl.textContent = currentData.question;
  optionsContainerEl.innerHTML = "";
  feedbackTextEl.textContent = "";

  const savedAnswer = userAnswers[currentQuestion];

  currentData.options.forEach((optionText, index) => {
    const button = document.createElement("button");
    button.textContent = optionText;
    button.classList.add("option-btn");

    // Restore visual feedback if already answered
    if (savedAnswer !== null) {
      button.disabled = true;
      if (index === currentData.answer) {
        button.classList.add("correct");
      } else if (index === savedAnswer) {
        button.classList.add("incorrect");
      }
    } else {
      button.addEventListener("click", () => selectAnswer(index));
    }

    optionsContainerEl.appendChild(button);
  });

  if (savedAnswer !== null) {
    showFeedback(savedAnswer === currentData.answer);
  }

  prevBtn.disabled = currentQuestion === 0;
  nextBtn.textContent = currentQuestion === quizData.length - 1 ? "Finish" : "Next";
}

// Handle option selection
function selectAnswer(selectedIndex) {
  userAnswers[currentQuestion] = selectedIndex;
  loadQuestion();
}

// Show immediate feedback text
function showFeedback(isCorrect) {
  feedbackTextEl.textContent = isCorrect ? "Correct!" : "Incorrect!";
  feedbackTextEl.style.color = isCorrect ? "#28a745" : "#dc3545";
}

// Navigation Event Listeners
prevBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    showResults();
  }
});

// Display final score screen
function showResults() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  finalScoreEl.textContent = `You scored ${calculateScore()} out of ${quizData.length}.`;
}

// Reset quiz state
restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  userAnswers.fill(null);
  resultBox.classList.add("hidden");
  quizBox.classList.remove("hidden");
  loadQuestion();
});

// Initialize quiz
loadQuestion();
