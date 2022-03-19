var startBtn = document.getElementById("start-btn");
var introSection = document.getElementById("intro");
var questionSc = document.getElementById("question-format-sc");
var endQuizSc = document.getElementById("end-quiz-sc");
var questionText = document.getElementById("question");
var answer1Text = document.getElementById("answer-btn-1");
var answer2Text = document.getElementById("answer-btn-2");
var answer3Text = document.getElementById("answer-btn-3");
var answer4Text = document.getElementById("answer-btn-4");
var currentCorrectAnswer;
var currentQuestionIdx = 0;
var quizLength = 3;
var questionBank;
var timer = document.getElementById("timer");
var timeLeft = 10;
var activeSection;

let QuestionsObj = [
    {
        questionText: "This is question 1",
        correctAnsStr: "This is the right answer",
        AnswerArr: [
            'This is the right answer',
            'This is the wrong answer',
            'This is also the wrong answer',
            'This also is wrong'
        ]
    },
    {
        questionText: "This is question 2",
        correctAnsStr: "This is the right answer q2",
        AnswerArr: [
            'This is the right answer q2',
            'This is the wrong answer',
            'This is also the wrong answer',
            'This also is wrong'
        ]
    },
    {
        questionText: "This is question 3",
        correctAnsStr: "This is the right answer q3",
        AnswerArr: [
            'This is the right answer q3',
            'This is the wrong answer',
            'This is also the wrong answer',
            'This also is wrong'
        ]
    }

]

// show intro section on load
window.onload = function(){
    introSection.classList.remove("hidden");
    activeSection = introSection;
    timer.textContent = timeLeft;
}

// function to reveal a hidden section and hide the active one
function reveal(thisSection) {
    //hide active section
    activeSection.classList.add("hidden");

    //reveal new section
    thisSection.classList.remove("hidden");
    activeSection = thisSection;
}

//generate the quiz and start from the first question. also hides the intro section & reveals question section once generated.
function startQuiz(){
    console.log("started quiz");
    intervalID = setInterval(showScore, 1000);
    quiz();
    reveal(questionSc);
}

function quiz() {
    loadQuestion(currentQuestionIdx);
}

function loadQuestion(questionNum) {
    var newQuestion = QuestionsObj[questionNum];
    currentCorrectAnswer = newQuestion.correctAnsStr;
    questionText.innerHTML = newQuestion.questionText;
    answer1Text.innerHTML = newQuestion.AnswerArr[0];
    answer2Text.innerHTML = newQuestion.AnswerArr[1];
    answer3Text.innerHTML = newQuestion.AnswerArr[2];
    answer4Text.innerHTML = newQuestion.AnswerArr[3];
}

function checkAnswer(answerClicked) {
    if(answerClicked == currentCorrectAnswer){
        return true;
    }
    else{ return false }
}

function updateScore(chk) {
    if(chk){
        console.log("The answer was correct");
    }
    else{
        console.log("The answer was incorrect");
        //decrement time
        timeLeft -= 10;
    }
}

function btnHandler() {
    var answerToCheck = this.textContent;
    updateScore(checkAnswer(answerToCheck));
    currentQuestionIdx++;
    moveOn();
}

function moveOn() {
    if(currentQuestionIdx < quizLength) {
        quiz();
    }
    else { 
       endQuiz();
    }
}

function holdScore() {
    var tempScore = timeLeft;
    console.log("Your score is:" + tempScore);

    var scoreOutput = document.getElementById("final-score");
    scoreOutput.textContent = tempScore;
}

function showScore() {
    timeLeft--;
    console.log(timeLeft);
    timer.textContent = timeLeft;

    if(timeLeft <= 0){
        endQuiz();
    }
}


function endQuiz(){
    holdScore();
    reveal(endQuizSc);
    clearInterval(intervalID);

 
}

answer1Text.addEventListener("click", btnHandler);
answer2Text.addEventListener("click", btnHandler);
answer3Text.addEventListener("click", btnHandler);
answer4Text.addEventListener("click", btnHandler);

startBtn.addEventListener("click", startQuiz);