$(document).ready(function () {


  //position of user in quiz...aka which question are they on
  var position = 0;
  //number of questions answered correctly
  var correct = 0;
  //global variables for quiz
  var progress, test, question, userChoice, allChoices, chA, chB, chC, chD;
  //quiz questions and answers
  var game = {
    myQuestions: [
      {
        question: "Who holds the record for most career passing touchdowns?",
        possibles: ["Bernie Kosar", "Kelly Holcomb", "Otto Graham", "Brian Sipe"],
        id: "question-one",
        answer: 2
      }, {
        question: "Who was the coach of The Kardiac Kids?",
        possibles: ["Marty Schottenheimer", "Sam Rutigliano", "Paul Brown", "Bill Belichick"],
        id: "question-two",
        answer: 1
      }, {
        question: "What year did the Cleveland Browns go undefeated?",
        possibles: ["1948", "1962", "1981", "2017"],
        id: "question-three",
        answer: 0
      }, {
        question: "Who is the only Cleveland Browns player to be named Defensive Rookie of the Year?",
        possibles: ["Michael Dean Perry", "Clay Matthews", "Myles Garrett", "Chip Banks"],
        id: "question-four",
        answer: 3
      }, {
        question: "Who holds the record for most rushing yards in a single game?",
        possibles: ["Kevin Mack", "Jim Brown", "Jerome Harrison", "Eric Metcalf"],
        id: "question-five",
        answer: 2
      }, {
        question: "Who is the man who replaced Bernie Kosar at Quarterback?",
        possibles: ["Tom Brady", "Tim Couch", "Spergon Wynn", "Vinnie Testaverde"],
        id: "question-six",
        answer: 3
      }, {
        question: "What is the highest number of games the Browns have won in the regular season?",
        possibles: ["16", "14", "12", "10"],
        id: "question-seven",
        answer: 1
      }, {
        question: "Who is the only player with a statue outside First Energy Stadium?",
        possibles: ["Jim Brown", "Lou Groza", "Otto Graham", "Johnny Manziel"],
        id: "question-eight",
        answer: 0
      }, {
        question: "What season did the Browns last win a playoff game?",
        possibles: ["2017", "1988", "1994", "2002"],
        id: "question-nine",
        answer: 2
      }, {
        question: "Which university hosted the Browns first training camps from 1946-1951?",
        possibles: ["Case Western Reserve University", "Kent State University", "The Ohio State University", "Bowling Green State University"],
        id: "question-ten",
        answer: 3
      }
    ]
  };

  $("#questions-container").hide();
  $(".timer").hide();
  $("#restartButton").hide();
  $(".startGame").on("click", function () {
    $(".startGame").hide();
    $(".timer").show();
    $("#questions-container").show();
    $("#restartButton").show();
  });
  renderQuestion();
  //function for get elementById
  function get(x) {
    return document.getElementById(x);
  }
  function renderQuestion() {
    testResult = get("#questions-container");
    //if all questions answered
    if (position >= game.myQuestions.length) {
      testResult.innerHTML = "<h2>You got " + correct + " of " + game.myQuestions.length + " questions correct</h2><br>"
      "<br><button id=reset>Start Over</button>"
      $(".timer").hide(0);
      //resets variables
      position = 0;
      correct = 0;
      //stops rest of function from running if test is complete
      return false;
    }


    //shows progress to user

    //get("progress").innerHTML = "Question " + (position + 1) + " of " + myQuestions.length;
    //}

    //sets value in array of question to be asked
    question = game.myQuestions.question[position];
    //sets value in array of answer choices
    chA = game.myQuestions.possible[position][0];
    chB = game.myQuestions.possible[position][1];
    chC = game.myQuestions.possible[position][2];
    chD = game.myQuestions.posible[position][3];
    answer = game.myQuestions.answer[position];
    //displays question and answer choices and submit button
    test.innerHTML = "<h3>" + question + "</h3>";
    test.innerHTML += "<input type='radio' name='choices' value='0'> " + ch0 + "<br>";
    test.innerHTML += "<input type='radio' name='choices' value='1'> " + ch1 + "<br>";
    test.innerHTML += "<input type='radio' name='choices' value='2'> " + ch2 + "<br>";
    test.innerHTML += "<input type='radio' name='choices' value='3'> " + ch3 + "<br><br>";
    test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>"

    //checkAnswer();
    run();
    renderQuestion();
  }

  function correctAnswer() {
    correct++;
    gameHTML = "<h3>Correct! The Answer is " + game.myQuestions.answer[position] + ".</h3>"
    $("#questions-container").html(gameHTML);
    setTimeout(2500);
  }
  //var corAnswer = document.getElementById("test").innerHTML("Correct Answer!")
  //checks if answer is correct
  function checkAnswer() {
    //loops through array of answer choices
    choices = document.getElementsByName("possible");
    test = document.getElementById("#questions-container");
    for (var i = 0; i < choices.length; i++) {
      if (choices[i].checked) {
        choice = choices[i].value;
      }
    }
    //compares user choice to correct answer if equal does the things
    if (userChoice === answer) {
      //stop();
      //gameHTML = "Correct! The answer is " + myQuestions[position][5] + "."
      //increases total in correct variable
      correctAnswer();


    } else {

    }
    //test.innerHTML = "<h3>Correct Answer!</h3>";
    //changes position of user in quiz
    position++;
    //runs renderQuestion to go to next question in quiz
    renderQuestion();
    resetClock();
  }
  var counter = 15;
  var intervalId;

  function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
  }

  function decrement() {
    counter--;
    $(".timer").html("You have " + counter + " seconds left");
    if (counter === 0) {
      stop();
      //clearInterval(intervalId);
      resetClock();
      position++;
      $(".timer").html("You have " + counter + " seconds left");
      renderQuestion();
    }
  };

  function stop() {
    clearInterval(intervalId);
  };
  function resetClock() {
    counter = 16;
    run();
    decrement();
  };

  //var correctAnswer =  document.getElementById("test").innerHTML += "Correct Answer!"

  //run();
  window.addEventListener("load", renderQuestion, false)



});
