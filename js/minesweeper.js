var minesweeper = {

  tileSize: 32,
  interfaceHeight: 32,

  init: function () {

    var self = this;

    this.audio.init();
    this.highscores.init();

    this.container = document.getElementById("container");
    this.interface = document.getElementById("interface");
    this.viewport = document.getElementById("viewport");
    this.easy = document.getElementById("easy");
    this.medium = document.getElementById("medium");
    this.hard = document.getElementById("hard");
    this.time = new Counter("time", 3);
    this.counterTiles = new Counter("tiles", 3);
    this.counterMines = new Counter("mines", 3);

    this.easy.addEventListener("click", function () {
      self.setDifficulty("easy");
      self.newGame(8, 8, 10);
    });

    this.medium.addEventListener("click", function () {
      self.setDifficulty("medium");
      self.newGame(16, 16, 40);
    });

    this.hard.addEventListener("click", function () {
      self.setDifficulty("hard");
      self.newGame(30, 16, 99);
    });

    // this.newGame(16, 16, 40);

  },

  newGame: function (w, h, numberOfMines) {

    var width = w * this.tileSize,
        height = h * this.tileSize,
        n = numberOfMines,
        i, a, b, count, x, y, xx, yy,
        element, isMine,
        self = this;

    this.columns = w;
    this.rows = h;
    this.numberOfMines = numberOfMines;
    this.tilesLeft = w * h;
    this.markedTiles = 0;
    this.gameOver = false;
    this.time.setValue(0);
    this.startedAt = new Date().getTime();
    this.timerInterval = setInterval(function () {
      self.updateTime();
    }, 250);

    this.viewport.style.width = width + "px";
    this.viewport.style.height = height + "px";
    this.viewport.style.top = (this.interfaceHeight + 16) + "px";
    this.container.style.marginLeft = -((width + 16) / 2) + "px";
    this.container.style.marginTop = -((height + this.interfaceHeight) / 2) + "px";
    this.container.style.width = (width + 16) + "px";
    this.container.style.height = (height + this.interfaceHeight + 24) + "px";

    // reset and clear all previous stuff
    this.viewport.innerHTML = "";

    // generate minefield
    this.minefield = [];
    for (i = 0; i < (w * h); i++) {
      this.minefield.push(0);
    }
    while (n) {
      x = Math.floor(Math.random() * w);
      y = Math.floor(Math.random() * h);
      i = (y * w) + x;
      if (this.minefield[i] == 0) {
        this.minefield[i] = 1;
        n -= 1;
      }
    }

    // generate hints and tiles
    this.hints = [];
    this.tiles = [];
    this.buffer = [];
    for (y = 0; y < h; y++) {
      for (x = 0; x < w; x++) {

        i = (y * w) + x;
        count = 0;
        isMine = this.minefield[i];
        for (a = -1; a < 2; a++) {
          for (b = -1; b < 2; b++) {
            xx = x + b;
            yy = y + a;
            if (xx >= 0 && xx < w && yy >= 0 && yy < h) {
              j = (yy * w) + xx;
              count += this.minefield[j];
            }
          }
        }
        this.hints[i] = count;
        this.tiles[i] = new Tile(x, y, isMine ? "mine" : count);

        // buffer empty tiles for random start
        if (count == 0) {
          this.buffer.push(i);
        }

      }
    }

    // pick a random starting tile
    if (this.buffer.length) {
      var r = Math.floor(Math.random() * this.buffer.length);
      this.tiles[this.buffer[r]].onClick();
    }

  },

  addTile: function (element) {
    this.viewport.appendChild(element);
  },

  getTile: function (x, y) {
    var i = (y * this.columns) + x,
        tile = this.tiles[i];
    return tile;
  },

  checkGame: function () {
    if (this.gameOver) {
      // alert("You lost!");
    } else if (this.tilesLeft == this.numberOfMines) {
      clearInterval(this.timerInterval);
      this.highscores.add(this.difficulty, (new Date().getTime() - this.startedAt) / 1000);
      alert("You won!");
    } else {
      this.counterTiles.setValue(this.tilesLeft);
      this.counterMines.setValue(this.numberOfMines - this.markedTiles);
    }
  },

  endGame: function () {
    this.gameOver = true;
    clearInterval(this.timerInterval);
    for (var i = 0; i < this.tiles.length; i++) {
      this.tiles[i].update(true);
    }
  },

  updateTime: function () {
    var now = new Date().getTime(),
        seconds = Math.floor((now - this.startedAt) / 1000);
    this.time.setValue(seconds);
  },

  setDifficulty: function (difficulty) {
    this.difficulty = difficulty;
    this.easy.className = (difficulty == "easy") ? "current" : "";
    this.medium.className = (difficulty == "medium") ? "current" : "";
    this.hard.className = (difficulty == "hard") ? "current" : "";
  }

}
