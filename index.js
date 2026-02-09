const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Fetch programming questions
async function fetchQuestions() {
  const res = await fetch(
    "https://opentdb.com/api.php?amount=5&category=18&type=multiple",
  );
  const data = await res.json();
  questions = data.results;
  showQuestion();
}

function showQuestion() {
  answersEl.innerHTML = "";

  const currentQuestion = questions[currentQuestionIndex];
  questionEl.innerHTML = decodeHTML(currentQuestion.question);

  const answers = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ];

  // Shuffle answers
  answers.sort(() => Math.random() - 0.5);

  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("options");
    button.textContent = decodeHTML(answer);
    button.onclick = () => checkAnswer(answer);
    answersEl.appendChild(button);
  });
}

function checkAnswer(selectedAnswer) {
  const correctAnswer = questions[currentQuestionIndex].correct_answer;

  if (selectedAnswer === correctAnswer) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionEl.textContent = "Quiz Completed!";
  answersEl.innerHTML = "";
  scoreEl.textContent = `Your score: ${score} / ${questions.length}`;
}

// Fix HTML entities from API
function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

fetchQuestions();
