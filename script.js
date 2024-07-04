const questions = [
    {
        question: "Where is HackClub HQ?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Seattle", correct: false },
            { text: "Vermont", correct: true },
            { text: "The Valley", correct: false }
        ]
    },
    {
        question: "Do you enjoy HackClub?",
        answers: [
            { text: "No", correct: false },
            { text: "YES", correct: true },
            { text: "Yuck", correct: false },
            { text: "Never", correct: false }
        ]
    },
];

const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const popup = document.getElementById('popup');
const popupText = document.getElementById('popup-text');
const modeToggle = document.getElementById('mode-toggle');
const toggleQuizMakerButton = document.getElementById('toggle-quiz-maker');
const quizMaker = document.getElementById('quiz-maker');
const quizForm = document.getElementById('quiz-form');
const startQuizButton = document.getElementById('start-quiz-btn');

let currentQuestionIndex = 0;
let score = 0;
let quizMode = 'quiz'; // 'quiz' or 'maker'

toggleQuizMakerButton.addEventListener('click', toggleQuizMaker);
quizForm.addEventListener('submit', addQuestion);
startQuizButton.addEventListener('click', startQuiz);

function toggleQuizMaker() {
    if (quizMode === 'quiz') {
        quizMode = 'maker';
        toggleQuizMakerButton.innerText = 'Back to Quiz';
        quizMaker.style.display = 'block';
        document.getElementById('quiz-container').style.display = 'none';
    } else {
        quizMode = 'quiz';
        toggleQuizMakerButton.innerText = 'Create Quiz';
        quizMaker.style.display = 'none';
        document.getElementById('quiz-container').style.display = 'block';
    }
}

function addQuestion(event) {
    event.preventDefault();
    const question = quizForm.question.value;
    const answers = [
        { text: quizForm.answer1.value, correct: parseInt(quizForm.correct.value) === 1 },
        { text: quizForm.answer2.value, correct: parseInt(quizForm.correct.value) === 2 },
        { text: quizForm.answer3.value, correct: parseInt(quizForm.correct.value) === 3 },
        { text: quizForm.answer4.value, correct: parseInt(quizForm.correct.value) === 4 }
    ];
    questions.push({ question, answers });
    quizForm.reset();
    alert('Question added successfully!');
}
  
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
