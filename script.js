const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Lisbon", correct: false }
        ]
    },
    {
        question: "Who is the current CEO of Tesla?",
        answers: [
            { text: "Jeff Bezos", correct: false },
            { text: "Elon Musk", correct: true },
            { text: "Bill Gates", correct: false },
            { text: "Sundar Pichai", correct: false }
        ]
    },
];

const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const popup = document.getElementById('popup');
const popupText = document.getElementById('popup-text');
const modeToggle = document.getElementById('mode-toggle');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionContainer.innerText = question.question;
    answerButtons.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer, button));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(answer, button) {
    if (answer.correct) {
        button.classList.add('correct');
        score++;
        popupText.innerText = "Correct!";
    } else {
        button.classList.add('incorrect');
        popupText.innerText = `Incorrect! The correct answer is ${questions[currentQuestionIndex].answers.find(a => a.correct).text}.`;
    }
    popup.style.display = 'block';
    Array.from(answerButtons.children).forEach(btn => {
        btn.disabled = true;
        if (btn !== button && btn.innerText === answer.text && answer.correct) {
            btn.classList.add('correct');
        }
    });
    setTimeout(() => {
        popup.style.display = 'none';
        showNextQuestion();
    }, 2000);
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        nextButton.classList.add('hide');
    } else {
        showResults();
    }
}

function showResults() {
    questionContainer.innerText = `Quiz Finished! Your score: ${score}/${questions.length}`;
    answerButtons.innerHTML = '';
    nextButton.classList.add('hide');
}

nextButton.addEventListener('click', showNextQuestion);

modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    modeToggle.innerText = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

startQuiz();
