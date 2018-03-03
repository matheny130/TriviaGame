$(document).ready(function () {
  var position = 0;
  var correct = 0;
  var progress = 0;
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
  function get(x) {
    return document.getElementById(x);
  }
  function renderQuestion() {
    testResult = get("#questions-container");
    if (position >= game.myQuestions.length) {
      testResult.innerHTML = "<h2>You got " + correct + " of " + game.myQuestions.length + " questions correct</h2><br>"
      "<br><button id=reset>Start Over</button>"
      $(".timer").hide(0);
      position = 0;
      correct = 0;
      return false;
    }

    question = game.myQuestions.question[position];

    chA = game.myQuestions.possible[position][0];
    chB = game.myQuestions.possible[position][1];
    chC = game.myQuestions.possible[position][2];
    chD = game.myQuestions.posible[position][3];
    answer = game.myQuestions.answer[position];

    test.innerHTML = "<h3>" + question + "</h3>";
    test.innerHTML += "<input type='radio' name='choices' value='0'> " + ch0 + "<br>";
    test.innerHTML += "<input type='radio' name='choices' value='1'> " + ch1 + "<br>";
    test.innerHTML += "<input type='radio' name='choices' value='2'> " + ch2 + "<br>";
    test.innerHTML += "<input type='radio' name='choices' value='3'> " + ch3 + "<br><br>";
    test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>"


    run();
    renderQuestion();
  }

  function correctAnswer() {
    correct++;
    gameHTML = "<h3>Correct! The Answer is " + game.myQuestions.answer[position] + ".</h3>"
    $("#questions-container").html(gameHTML);
    setTimeout(2500);
  }

  function checkAnswer() {
    choices = document.getElementsByName("possible");
    test = document.getElementById("#questions-container");
    for (var i = 0; i < choices.length; i++) {
      if (choices[i].checked) {
        choice = choices[i].value;
      }
    }
    if (userChoice === answer) {
      correctAnswer();
    } else {

    }
    position++;

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


  window.addEventListener("load", renderQuestion, false)



});
