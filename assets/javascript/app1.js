
var panel = $("#quiz-area");
var countStartNumber = 15;
var questions = [{
        question: "Who holds the record for most career passing touchdowns?",
        answers: ["Bernie Kosar", "Kelly Holcomb", "Otto Graham", "Brian Sipe"],
        correctAnswer: "Otto Graham"
      }, {
        question: "Who was the coach of The Kardiac Kids?",
        answers: ["Marty Schottenheimer", "Sam Rutigliano", "Paul Brown", "Bill Belichick"],
        correctAnswer: "Sam Rutigliano"
      }, {
        question: "What year did the Cleveland Browns go undefeated?",
        answers: ["1948", "1962", "1981", "2017"],
        correctAnswer: "1948"
      }, {
        question: "Who is the only Cleveland Browns player to be named Defensive Rookie of the Year?",
        answers: ["Michael Dean Perry", "Clay Matthews", "Myles Garrett", "Chip Banks"],
        correctAnswer: "Chip Banks"
      }, {
        question: "Who holds the record for most rushing yards in a single game?",
        answers: ["Kevin Mack", "Jim Brown", "Jerome Harrison", "Eric Metcalf"],
        correctAnswer: "Jerome Harrison"
      }, {
        question: "Who is the man who replaced Bernie Kosar at Quarterback?",
        answers: ["Tom Brady", "Tim Couch", "Spergon Wynn", "Vinnie Testaverde"],
        correctAnswer: "Vinnie Testaverde"
      }, {
        question: "What is the highest number of games the Browns have won in the regular season?",
        answers: ["16", "14", "12", "10"],
        correctAnswer: "14"
      }, {
        question: "Who is the only player with a statue outside First Energy Stadium?",
        answers: ["Jim Brown", "Lou Groza", "Otto Graham", "Johnny Manziel"],
        correctAnswer: "Jim Brown"
      }, {
        question: "What season did the Browns last win a playoff game?",
        answers: ["2017", "1988", "1994", "2002"],
        correctAnswer: "1994"
      }, {
        question: "Which university hosted the Browns first training camps from 1946-1951?",
        answers: ["Case Western Reserve University", "Kent State University", "The Ohio State University", "Bowling Green State University"],
        correctAnswer: "Bowling Green State University"
      }];

var timer;

var game = {
  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function () {
    this.counter--;
    $("#counter-number").text(this.counter);
    if (this.counter === 0) {
      console.log("time up");
      this.timeUp();
    }
  },

  loadQuestion: function () {
    timer = setInterval(this.countdown.bind(this), 1000);

    panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
        + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function () {
    this.counter = window.countStartNumber;
    $("#counter-number").text(this.counter);
    this.currentQuestion++;
    this.loadQuestion.bind(this)();
  },

  timeUp: function () {
    clearInterval(window.timer);
    $("#counter-number").text(this.counter);
    panel.html("<h2>Out Of Time!</h2>");
    panel.append("<br><h3>The Correct Answer was " + questions[this.currentQuestion].correctAnswer + "</h3>");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 1.5 * 1000);
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 1.5 * 1000);
    }
  },

  results: function () {
    clearInterval(window.timer);
    panel.html("<h2>All done, heres how you did!</h2>");
    $("#counter-number").text(this.counter);
    panel.append("<h3>Correct Answers: " + this.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
    panel.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function (e) {
    clearInterval(window.timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function () {
    this.incorrect++;
    clearInterval(window.timer);
    panel.html("<h2>Nope!</h2>");
    panel.append("<br><h3>The Correct Answer was " + questions[this.currentQuestion].correctAnswer + "</h3>");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 1.5 * 1000);
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 1.5 * 1000);
    }
  },

  answeredCorrectly: function () {
    clearInterval(window.timer);
    this.correct++;
    panel.html("<h2>Correct!</h2>");
    panel.append("<br><h3>The Answer was " + questions[this.currentQuestion].correctAnswer + "</h3>");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 1.5 * 1000)
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 1.5 * 1000);
    }
  },

  reset: function () {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};


$(document).on("click", "#start-over", game.reset.bind(game));

$(document).on("click", ".answer-button", function (e) {
  game.clicked.bind(game, e)();
});

$(document).on("click", "#start", function () {
  $("#sub-wrapper").prepend("<h2>Time Remaining <span id='counter-number'>15</span> Seconds</h2><br><br><br>");
  game.loadQuestion.bind(game)();
});

