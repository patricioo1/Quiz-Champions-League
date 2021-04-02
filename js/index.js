import { scoreState, questionState } from './constants.js';
const scoreModule = scoreState(1);
const questionModule = questionState();

const Questions = [{
        question: "Który zawodnik strzelił najwięcej goli w historii Ligi Mistrzów?",
        answers: [
            "Lionel Messi",
            "Robert Lewandowski",
            "Cristiano Ronaldo",
            "Karim Benzema"
        ],
        correctAnswer: "Cristiano Ronaldo"
    },
    {
        question: "Która drużyna jako pierwsza wygrała Puchar Ligi Mistrzów?",
        answers: [
            "Bayern Monachium",
            "FC Barcelona",
            "Real Madryt",
            "Legia Warszawa"
        ],
        correctAnswer: "Real Madryt"
    },
    {
        question: "Jakim wynikiem zakończył się mecz w fazie grupowej Ligi Mistrzów pomiędzy Legią Warszawa a Borussią Dortmund, rozegrany 22 listopada 2016 roku?",
        answers: [
            "8:4",
            "3:2",
            "5:5",
            "10:6",
        ],
        correctAnswer: "8:4"
    },
    {
        question: "W którym roku został rozegrany finał Ligi Mistrzów FC Liverpool vs AC Milan?",
        answers: [
            "2004",
            "2003",
            "2005",
            "2006"
        ],
        correctAnswer: "2005"
    },
    {
        question: "Z jakim trenerem Chelsea Londyn zdobyła Ligę Mistrzów w 2012 roku?",
        answers: [
            "Andre Villas-Boas",
            "Carlo Ancelotti",
            "Rafael Benitez",
            "Roberto Di Matteo"
        ],
        correctAnswer: "Roberto Di Matteo"
    },
    {
        question: "Ilu polskich bramkarzy wygrało Ligę Mistrzów?",
        answers: [
            "2",
            "3",
            "4",
            "5"
        ],
        correctAnswer: "4"
    },
    {
        question: "Jakim wynikiem zakończył się finał Ligi Mistrzów w 2013 roku pomiędzy Bayernem Monachium a Borussią Dortmund, w którym brało udział trzech Polaków?",
        answers: [
            "2:0",
            "2:1",
            "3:2",
            "1:0"
        ],
        correctAnswer: "2:1"
    },
    {
        question: "Który pierwszy polski bramkarz wywalczył Puchar Ligi Mistrzów?",
        answers: [
            "Tomasz Kuszczak",
            "Józef Młynarczyk",
            "Artur Boruc",
            "Jerzy Dudek"
        ],
        correctAnswer: "Józef Młynarczyk"
    },
    {
        question: "Która polska drużyna wygrała w III rundzie kwalifikacyjnej do Ligi Mistrzów z FC Barceloną w 2008 roku?",
        answers: [
            "Wisła Kraków",
            "Legia Warszawa",
            "Lech Poznań",
            "Piast Gliwice"
        ],
        correctAnswer: "Wisła Kraków"
    },
    {
        question: "Który klub przegrał najwięcej razy finałowy mecz Ligi Mistrzów?",
        answers: [
            "Manchester United",
            "Juventus Turyn",
            "Borussia Dortmund",
            "Atletico Madryt"
        ],
        correctAnswer: "Juventus Turyn"
    },
    {
        question: "Który polski bramkarz wygrał Ligę Mistrzów z Manchesterem United?",
        answers: [
            "Tomasz Kuszczak",
            "Łukasz Załuska",
            "Wojciech Szczęsny",
            "Łukasz Fabiański"
        ],
        correctAnswer: "Tomasz Kuszczak"
    }
];

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
getAnswerToButton(questionModule.getQuestion());
}

const getAnswerToButton = (id) => {
    console.log(id);
    quizQuestion.innerHTML = Questions[id].question;
    for (let answer = 0; answer < quizAnswers.length; answer++) {
        quizAnswers[answer].innerHTML = Questions[id].answers[answer];
    }
}

for (let i = 0; i < quizAnswers.length; i++) {
    quizAnswers[i].addEventListener('click', () => {
        selectCorrectAnswer(i);
        elementWasClicked = true;
        console.log(elementWasClicked);
    });
};

nextQuestion.addEventListener('click', () => {
    if (!elementWasClicked) {
        console.log('BRAK ZAZNACZONEJ ODPOWIEDZI');
        console.log(!elementWasClicked);
    } else {
        questionModule.incrementQuestion();
        elementWasClicked = false;
    }
    getAnswerToButton(questionModule.getQuestion());
    isQuestionAnswered = true;
    quizAnswers.forEach(answer => {
        answer.classList.remove('correct');
        answer.classList.remove('wrong');
    });
    if (questionModule.getQuestion() === Questions.length -1) {
        console.log('to jest ostatnie pytanie');
        finishQuestion.classList.remove('hide');
        nextQuestion.classList.add('hide');
    }
})


const selectCorrectAnswer = (index) => {
    const currentQuestion = Questions[questionModule.getQuestion()];
    for (let i = 0; i < currentQuestion.answers.length; i++) {
        console.log(index);
   if (currentQuestion.answers[i] === currentQuestion.correctAnswer) {
       console.log('poprawna');
       quizAnswers[i].classList.add('correct');
   } else {
       console.log('niepoprawna');
       quizAnswers[i].classList.add('wrong');
   }
    }
    const selectedAnswerText = currentQuestion.answers[index];
    console.log(currentQuestion.answers[index]);
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