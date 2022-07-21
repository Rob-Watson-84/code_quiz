//Setting global variables on starting page
var viewHighScore = document.getElementById("viewHighScore");
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timeUp = document.getElementById("timeUp");
var startDiv = document.getElementById("start");
var startQuizBtn = document.getElementById("start-quiz-button");

//Setting global variables used in quiz section
var questionDiv = document.getElementById("questionDiv");
var questionTitle = document.getElementById("questionTitle");
var choiceA = document.getElementById("btn0");
var choiceB = document.getElementById("btn1");
var choiceC = document.getElementById("btn2");
var choiceD = document.getElementById("btn3");
var userAnswer = document.getElementById("userAnswer");

//Setting gloabl variables used in score section
var summary = document.getElementById("summary");
var finalScore = document.getElementById("finalScore");
var userInitials = document.getElementById("userInitials");
var submitBtn = document.getElementById("submitBtn");

//Setting global variables used in highscore section
var highScoreSection = document.getElementById("highScoreSection");
var listOfHighScores = document.getElementById("listOfHighScores");
var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn"); 

//Array of objects: Question with 4 possible answers.
var questionArray = [
    {
        question: "HTML is an acronym of:",
        choices: ["A. HigherText Markup Language", "B. HyperText Markup Language", "C. HyperText Makeup Language", "D. HigherText Makeup Language"],
        answer: "B. HyperText Markup Language"
    },
    {
        question: "Inside which HTML element do we add the Javascript?",
        choices: ["A. <span>", "B. <style>", "C. <section>", "D. <script>"],
        answer: "D. <script>"
    },
    {
        question: "String values must be enclosed with ________ when assigned to variables.",
        choices: ["A. parenthesis", "B. curly brackets", "C. quotations", "D. commas"],
        answer: "C. quotations"
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        choices: ["A. onclick", "B. onmouseclick", "C. click", "D. mouseclick"],
        answer: "A. onclick"
    },
    {
        question: "First index of the array is ___.",
        choices: ["A. [0]", "B. [1]", "C. (0)", "D. (1)"],
        answer: "A. [0]"
    },
    {
        question: "In HTML, an order list is created by which tag?",
        choices: ["A. <ul>", "B. <li>", "C. <ol>", "D. <dl>"],
        answer: "C. <ol>"
    },
    {
        question: "What does the acronym CSS stand for?",
        choices: ["A. Cascaded Style Sheets", "B. Cascading Style Sheets", "C. Coding Style Sheets", "D. Concatenated Style Sheets"],
        answer: "B. Cascading Style Sheets"
    },
    {
        question: "How do you create a function in Javascript?",
        choices: ["A. function = myFunction()", "B. function.myFunction()", "C. function myFunction()", "D. createMyFunction()"],
        answer: "C. function myFunction()"
    },
    {
        question: "How do you call a function named myFunction?",
        choices: ["A. call myFunction", "B. myFunction()", "C. call.myFunction()", "D. my.Function()"],
        answer: "B. myFunction()"
    },
    {
        question: "How to write an IF statement in JavaScript?",
        choices: ["A. let (i == 0)", "B. if {i == 0}", "C. if (i == 0)", "D. let i = 0"],
        answer: "C. if (i == 0)"
    },
    {
        question: "How do you add a comment in a JavaScript?",
        choices: ["a. //This is a comment", "b. <!--This is a comment-->", "c. /*This is a comment*/", "d. */ This is a comment /*"],
        answer: "a. //This is a comment"
    },
];

// Start timer when "Start Quiz" button is clicked
var totalTime = 100;
var questionIndex = 0;

function newQuiz() {
    questionIndex = 0;
    totalTime = 100;
    timeLeft.textContent = totalTime;
    userInitials.textContent = "";

    startDiv.style.display = "none";
    questionDiv.style.display = "block";
    timer.style.display = "block";
    timeUp.style.display = "none";
    
    //Reducing timer by one second
    var startTimer = setInterval(function() {
        totalTime--;
        timeLeft.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questionArray.length - 1) {
                gameOver();
            }
        }
    },1000);

    showQuiz();
};

//Present user with question and possible answers
function showQuiz() {
    nextQuestion();
}

//Look for the next question from array and the answers choices
function nextQuestion() {
    questionTitle.textContent = questionArray[questionIndex].question;
    choiceA.textContent = questionArray[questionIndex].choices[0];
    choiceB.textContent = questionArray[questionIndex].choices[1];
    choiceC.textContent = questionArray[questionIndex].choices[2];
    choiceD.textContent = questionArray[questionIndex].choices[3];
}

//After question is answered, show if correct or wrong
function checkAnswer(answer) {

    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    userAnswer.style.display = "block";

    var correctAns = 0;

    if (questionArray[questionIndex].answer === questionArray[questionIndex].choices[answer]) {
        //Add 1 point to final score
        correctAns++;
        userAnswer.textContent = "Correct!";
    } else {
        //Reduce timer by 10 seconds for wrong answer
        totalTime -= 10;
        timeLeft.textContent = totalTime;
        userAnswer.textContent = "Wrong! The correct answer is: " + questionArray[questionIndex].answer;
    }

    questionIndex++;
    //Get the next question from the array
    if (questionIndex < questionArray.length) {
        nextQuestion();
    } else {
        //If no more questions, game is over
        gameOver();
    }
}

function chooseA() { checkAnswer(0); }

function chooseB() { checkAnswer(1); }

function chooseC() { checkAnswer(2); }

function chooseD() { checkAnswer(3); }

//All questions are asked or timer reaches 0
function gameOver() {
    summary.style.display = "block";
    questionDiv.style.display = "none";
    startDiv.style.display = "none";
    timer.style.display = "none";
    timeUp.style.display = "block";

    //Displays final score as total time left
    finalScore.textContent = totalTime;
}

//Function to store highscore in local storage
function storeHighScores(event) {
    event.preventDefault();

    //User must enter initials
    if (userInitials.value === "") {
        alert("Please enter your initials!");
        return;
    } 

    //Hide displays when entering initials
    startDiv.style.display = "none";
    timer.style.display = "none";
    timeUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";   

    //Get score(s) from local storage
    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }
    var userScore = {
        initials: userInitials.value,
        score: finalScore.textContent
    };

    scoresArray.push(userScore);
    
     //Stringify array to store in local storage
    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);
    
    //Show highscores 
    showHighScores();
}

//Function to show high scores
var i = 0;
function showHighScores() {

    startDiv.style.display = "none";
    timer.style.display = "none";
    questionDiv.style.display = "none";
    timeUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");

    //Check if there are high scores in local storage
    if (savedHighScores === null) {
        return;
    }
    
    var storedHighScores = JSON.parse(savedHighScores);

    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}

//Event listeners
startQuizBtn.addEventListener("click", newQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

submitBtn.addEventListener("click", function(event){ 
    storeHighScores(event);
});

viewHighScore.addEventListener("click", function(event) { 
    showHighScores(event);
});

goBackBtn.addEventListener("click", function() {
    startDiv.style.display = "block";
    highScoreSection.style.display = "none";
});

clearHighScoreBtn.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    listOfHighScores.innerHTML = "High Scores Cleared!";
    listOfHighScores.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
});