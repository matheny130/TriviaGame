$(document).ready(function () {

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

  var message = "Game Over!";

  $("#questions-container").hide();
  $(".timer").hide();
  $("#doneButton").hide();
  $(".startGame").on("click", function () {
    $(".timer").show();
    $("#questions-container").show();
    $(".startGame").hide();
    $("#doneButton").show();
    run()
  });


  var number = 60;

  function decrement() {
    number--;
    $("#timeLeft").html("" + number + " seconds left");
    if (number === 0) {
      stop();
      $("#message").html("Time's Up!");
      checkAnswers();
    }
  }

  function run() {
    counter = setInterval(decrement, 1000);
  }

  function stop() {
    clearInterval(counter);
  }



  function formTemplate(data) {
    var qString = "<br><form id='questionOne'>" + data.question + "<br>";
    var possibles = data.possibles;
    for (var i = 0; i < possibles.length; i++) {
     var possible = possibles[i];
      qString = qString + "<input type='radio' name='" + data.id + "' value=" + i + ">" + possible;
    };
    return qString + "</form>";
  }
  window.formTemplate = formTemplate;

  function buildQuestions() {
    var questionHTML = ""
    for (var i = 0; i < game.myQuestions.length; i++) {
      questionHTML = questionHTML + formTemplate(game.myQuestions[i]);
    }
    $("#questions-container").append(questionHTML);
  }

  function isCorrect(question) {
    var answers = $("[name=" + question.id + "]");
    var correct = answers.eq(question.answer);
    var checked = correct.is(":checked");
    return checked;
  }

  buildQuestions();

  function resultsTemplate(question) {
    var htmlBlock = "<div>"
    htmlBlock = htmlBlock + myQuestions.question + ":" + checked;
    return htmlBlock + "</div>";
  }

  function checkAnswers() {
    var results = "";
    var userChoices = [];
    var correct = 0;
    var incorrect = 0;
    var unAnswered = 0

    for (var i = 0; i < game.myQuestions.length; i++) {
      if (isCorrect(game.myQuestions[i])) {
        correct++;
      } else if (checkAnswered(game.myQuestions[i])) {
        incorrect++;
      } else {
        unAnswered++;
      }

    }

    $(".results").html("correct: " + correct + "<br> incorrect: " + incorrect + "<br> unanswered: " + unAnswered);
  }

  function checkAnswered(question) {
    var anyAnswered = false;
    var answers = $("[name=" + question.id + "]");
    for (var i = 0; i < answers.length; i++) {
      if (answers[i].checked) {
        anyAnswered = true;
      }
    }
    return anyAnswered;
  }

  $("#doneButton").on("click", function () {
    checkAnswers();
    stop();
    $("#messageDiv").html("Game Over!");
  })
});