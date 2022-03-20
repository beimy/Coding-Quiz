var startBtn = document.getElementById("start-btn");
var introSection = document.getElementById("intro");
var questionSc = document.getElementById("question-format-sc");
var endQuizSc = document.getElementById("end-quiz-sc");
var highScoreSc = document.getElementById("high-score-sc");
var questionText = document.getElementById("question");
var answer1Text = document.getElementById("answer-btn-1");
var answer2Text = document.getElementById("answer-btn-2");
var answer3Text = document.getElementById("answer-btn-3");
var answer4Text = document.getElementById("answer-btn-4");
var submitScoreBtn = document.getElementById("submit-initials");
var clearScoresBtn = document.getElementById("clear-scores");
var initialsTextarea = document.getElementById("initials-field");
var backToStartBtn = document.getElementById("go-back");
var backFromHSBtn = document.getElementById("back-to-main");
var toHighScoresBtn = document.getElementById("high-scores-button");
var highScoreTbl = document.getElementById("high-scores-tbl");
var currentCorrectAnswer;
var currentQuestionIdx = 0;
var quizLength = 10;
var questionBank;
var timer = document.getElementById("timer");
var timeLeft = 100;
var tempScore;
var ScoreList = JSON.parse(localStorage.getItem("ScoreList"));
var activeSection;

let QuestionsObj = [
    {
        questionText: "HTML is what type of language ?",
        correctAnsStr: 'Markup Language',
        AnswerArr: [
            'Scripting Language',
            'Markup Language',
            'Programming Language',
            'Network Protocol'
        ]
    },
    {
        questionText: "HTML uses",
        correctAnsStr: 'Fixed tags defined by the language',
        AnswerArr: [
            'User defined tags',
            'Pre-specified tags',
            'Fixed tags defined by the language',
            'Tags only for linking'
        ]
    },
    {
        questionText: "HTML web pages can be read and rendered by _________.",
        correctAnsStr: 'Web Browser',
        AnswerArr: [
            'Compiler',
            'Web Browser',
            'Server',
            'Interpreter'
        ]
    },
    {
        questionText: "HTML tags are surrounded by which type of brackets.",
        correctAnsStr: 'Angle',
        AnswerArr: [
            'Curly',
            'Round',
            'Square',
            'Angle'
        ]
    },
    {
        questionText: "Who is Known as the father of World Wide Web (WWW)?",
        correctAnsStr: '<head>',
        AnswerArr: [
            'Robert Cailliau',
            'Tim Thompson',
            'Charles Darwin',
            'Tim Berners-Lee'
        ]
    },
    {
        questionText: "Which of the following JavaScript cannot do?",
        correctAnsStr: 'All of the Above',
        AnswerArr: [
            'JavaScript can react to events',
            'JavaScript can manipulate HTML elements',
            'JavaScript can be use to validate data',
            'All of the Above'
        ]
    },
    {
        questionText: "Whats so great about XML?",
        correctAnsStr: 'Both A & B',
        AnswerArr: [
            'Easy data exchange',
            'High speed on network',
            'Only B. is correct',
            'Both A & B'
        ]
    },
    {
        questionText: "Which is not a property of attribute Behaviour of &ltMarquee&gt tag?",
        correctAnsStr: 'blur',
        AnswerArr: [
            'alternate',
            'blur',
            'scroll',
            'slide'
        ]
    },
    {
        questionText: "_________ keyword is used to declare variables in javascript.",
        correctAnsStr: 'Var',
        AnswerArr: [
            'Var',
            'Dim',
            'String',
            'None of the above'
        ]
    },
    {
        questionText: "The attribute used to define a new namespace is.",
        correctAnsStr: 'Xmlns',
        AnswerArr: [
            'XMLNS',
            'XmlNameSpace',
            'Xmlns',
            'XmlNs'
        ]
    }
]

// show intro section on load
window.onload = function(){
    introSection.classList.remove("hidden");
    activeSection = introSection;
    timer.textContent = timeLeft;

    if(ScoreList === null){
        ScoreList = [];
    }
    console.log(ScoreList);
    loadHighScores();
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

//displays next question
function quiz() {
    loadQuestion(currentQuestionIdx);
}

//loads new question data from our question obj array
function loadQuestion(questionNum) {
    var newQuestion = QuestionsObj[questionNum];
    currentCorrectAnswer = newQuestion.correctAnsStr;
    questionText.innerHTML = newQuestion.questionText;
    answer1Text.innerHTML = newQuestion.AnswerArr[0];
    answer2Text.innerHTML = newQuestion.AnswerArr[1];
    answer3Text.innerHTML = newQuestion.AnswerArr[2];
    answer4Text.innerHTML = newQuestion.AnswerArr[3];

}

// compares the clicked answer to the correct answer
function checkAnswer(answerClicked) {
    if(answerClicked == currentCorrectAnswer){
        return true;
    }
    else{ return false }
}

// handles decrementing of score
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

// handler attached to each answer button
function btnHandler() {
    var answerToCheck = this.textContent;
    updateScore(checkAnswer(answerToCheck));
    currentQuestionIdx++;
    moveOn();
}

// progresses quiz after an answer is entered
function moveOn() {
    if(currentQuestionIdx < quizLength) {
        quiz();
    }
    else { 
       endQuiz();
    }
}

// saves score of current quiz and outputs it on the end screen
function holdScore() {
    tempScore = timeLeft;
    console.log("Your score is: " + tempScore);

    var scoreOutput = document.getElementById("final-score");
    scoreOutput.textContent = tempScore;
}

// runs the timer on screen, checking if the timer is up
function showScore() {
    timeLeft--;
    console.log(timeLeft);
    timer.textContent = timeLeft;

    if(timeLeft <= 0){
        endQuiz();
    }
}

// ends quiz, holding the score, displaying the end page, and stoping the timer
function endQuiz() {
    holdScore();
    reveal(endQuizSc);
    clearInterval(intervalID);
} 

function clearScore() {
    localStorage.clear();
}

function backToStart() {
    location.reload();
}

function openHighScores() {
    reveal(highScoreSc);
}

function loadHighScores() {
    // get length of ScoreList
    var scoreListLength = Object.keys(ScoreList).length;

    // sort ScoreList
    ScoreList.sort(function(a,b) {
        return b.playerScore - a.playerScore;
    });

    // literal magic 
    for(var {playerInitials, playerScore} of ScoreList){
        console.log(playerInitials, playerScore);
        let newRow = highScoreTbl.insertRow(-1);

        let newCell = newRow.insertCell(0);
        let newCell2 = newRow.insertCell(1);

        let newText = document.createTextNode(playerInitials);
        let newText2 = document.createTextNode(playerScore);
        newCell.appendChild(newText);
        newCell2.appendChild(newText2);
    }
}

answer1Text.addEventListener("click", btnHandler);
answer2Text.addEventListener("click", btnHandler);
answer3Text.addEventListener("click", btnHandler);
answer4Text.addEventListener("click", btnHandler);


submitScoreBtn.addEventListener("click", function(event){
    event.preventDefault();
    
    var SavedScore = {
        playerInitials: "",
        playerScore: 0,
    };

    //add check for initials being present before saving

    //adding values to SavedScore obj
    SavedScore.playerInitials = initialsTextarea.value;
    SavedScore.playerScore = tempScore;

    //console logging the SavedScore values
    console.log(SavedScore.playerInitials);
    console.log(SavedScore.playerScore);
    console.log(SavedScore);

    //Push SavedScore into ScoreList and save it
    ScoreList.push(SavedScore);
    localStorage.setItem("ScoreList", JSON.stringify(ScoreList));
});

clearScoresBtn.addEventListener("click", clearScore);

backToStartBtn.addEventListener("click", backToStart);

startBtn.addEventListener("click", startQuiz);

toHighScoresBtn.addEventListener("click", openHighScores);

backFromHSBtn.addEventListener("click", backToStart);