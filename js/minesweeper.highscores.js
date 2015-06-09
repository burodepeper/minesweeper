minesweeper.highscores = {

  template: {
    "easy": false,
    "medium": false,
    "hard": false
  },

  init: function () {
    if (!localStorage.getItem("highscores")) {
      this.populate();
    }
    this.data = JSON.parse(localStorage.getItem("highscores"));
    this.display();
  },

  display: function () {
    console.log("easy:", this.data.easy.score);
    console.log("medium:", this.data.medium.score);
    console.log("hard:", this.data.hard.score);
  },

  populate: function () {
    this.data = this.template;
    this.save();
  },

  add: function (difficulty, score) {
    var current = this.data[difficulty];
    if (!current || score < current.score) {
      console.log("new highscore", score);
      this.data[difficulty] = {
        "score": score,
        "timestamp": new Date().getTime()
      }
      this.save();
    }
  },

  save: function () {
    localStorage.setItem("highscores", JSON.stringify(this.data));
  }

};
