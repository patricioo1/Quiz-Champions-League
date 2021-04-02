const INITIAL_SCORE = 0;
const INITIAL_QUESTION = 0;

const scoreState = (incrementStep) => {
    let score = INITIAL_SCORE;
    return {
        getScore: () => score,
        increment: () => {
            score = score + incrementStep;
        }
    };
}

const questionState = () => {
    let numberQuestion = INITIAL_QUESTION;
    return {
        getQuestion: () => numberQuestion,
        incrementQuestion: () => {
            numberQuestion = numberQuestion + 1;
        }
    }
}

export {
    scoreState,
    questionState
};