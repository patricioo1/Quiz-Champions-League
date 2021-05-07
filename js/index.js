import {
    scoreState,
    questionState
} from './states.js';

const scoreModule = scoreState(1);
const questionModule = questionState();

const startButton = document.querySelector(".Start__Question");
const containerControls = document.querySelector('.Quiz__Controls');
const nextQuestion = document.querySelector('.Next__Question');
const quizQuestion = document.querySelector('.Quiz__Question');
const quizAnswers = document.querySelectorAll('.Quiz__Answer');
const quizCounter = document.querySelector('.Counter');
const counterDigit = document.querySelector('.Counter__Digit');
const finishQuestion = document.querySelector('.Finish__Question');
const finishResult = document.querySelector('.Finish__Result');
const finishScore = document.querySelector('.Finish__Score');

let isQuestionAnswered = true;
let elementWasClicked = false;

startButton.addEventListener('click', startGame);

function startGame() {
    containerControls.classList.remove('hide');
    nextQuestion.classList.remove('hide');
    startButton.classList.add('hide');
    quizCounter.classList.remove('hide');
    getAnswerToButton(questionModule.getQuestionIndex());
}

const getAnswerToButton = (index) => {
    const currentQuestion = questionModule.getQuestion(index);
    quizQuestion.innerHTML = currentQuestion.question;
    quizAnswers.forEach((answer, answerIndex) => {
        answer.innerHTML = currentQuestion.answers[answerIndex];
        console.log(answer, answerIndex);
    })
}


quizAnswers.forEach((answer, answerIndex) => {
    answer.addEventListener('click', () => {
        selectCorrectAnswer(answerIndex);
        elementWasClicked = true;
    })
})

nextQuestion.addEventListener('click', () => {
    if (!elementWasClicked) {
        console.log('BRAK ZAZNACZONEJ ODPOWIEDZI');
        console.log(!elementWasClicked);
    } else {
        questionModule.incrementQuestion();
        elementWasClicked = false;
    }
    const currentQuestionIndex = questionModule.getQuestionIndex();
    getAnswerToButton(currentQuestionIndex);
    isQuestionAnswered = true;
    quizAnswers.forEach(answer => {
        answer.classList.remove('correct');
        answer.classList.remove('wrong');
    });
    if (currentQuestionIndex === questionModule.getNumberOfQuestions() - 1) {
        console.log('to jest ostatnie pytanie');
        finishQuestion.classList.remove('hide');
        nextQuestion.classList.add('hide');
    }
})


const selectCorrectAnswer = (selectedAnswerIndex) => {
    const currentQuestion = questionModule.getQuestion(questionModule.getQuestionIndex());
    for (let i = 0; i < currentQuestion.answers.length; i++) {
        console.log(selectedAnswerIndex);
        if (currentQuestion.answers[i] === currentQuestion.correctAnswer) {
            console.log('poprawna');
            console.log(currentQuestion.answers[i]);
            quizAnswers[i].classList.add('correct');
        } else {
            console.log('niepoprawna');
            quizAnswers[i].classList.add('wrong');
        }
    }
    const selectedAnswerText = currentQuestion.answers[selectedAnswerIndex];
    console.log(currentQuestion.answers[selectedAnswerIndex]);
    if (selectedAnswerText === currentQuestion.correctAnswer && isQuestionAnswered === true) {
        isQuestionAnswered = false;
        scoreModule.increment();
        console.log('ZOSTAŁ DODANY PUNKT');
        scoreModule.getScore();
        counterDigit.innerHTML = scoreModule.getScore();
    } else {
        isQuestionAnswered = false;
    }
}

const finishButton = () => {
    quizCounter.classList.add('hide');
    finishScore.classList.remove('hide');
    containerControls.classList.add('hide');
    finishQuestion.classList.add('hide');
    finishResult.innerHTML = `${counterDigit.innerText} pkt`
}

finishQuestion.addEventListener('click', finishButton);