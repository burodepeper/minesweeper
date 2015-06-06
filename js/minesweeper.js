var minesweeper = {

  tileSize: 32,
  interfaceHeight: 32,

  init: function () {

    var self = this;

    this.container = document.getElementById("container");
    this.interface = document.getElementById("interface");
    this.viewport = document.getElementById("viewport");
    this.newGameButton = document.getElementById("new-game-button");

    this.newGameButton.addEventListener("click", function () {
      self.newGame(30, 16, 99);
    });

    this.newGame(30, 16, 99);

  },

  newGame: function (w, h, numberOfMines) {

    var width = w * this.tileSize,
        height = h * this.tileSize,
        n = numberOfMines,
        i, a, b, count, x, y, xx, yy,
        element;

    this.viewport.style.width = width + "px";
    this.viewport.style.height = height + "px";
    this.viewport.style.top = this.interfaceHeight + "px";
    this.container.style.marginLeft = -(width / 2) + "px";
    this.container.style.marginTop = -((height + this.interfaceHeight) / 2) + "px";

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

    // generate hints
    this.hints = [];
    for (y = 0; y < h; y++) {
      for (x = 0; x < w; x++) {

        i = (y * w) + x;
        count = 0;
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

      }
    }

    // TODO draw mines and hints as a test
    for (y = 0; y < h; y++) {
      for (x = 0; x < w; x++) {
        i = (y * w) + x;
        xx = (x * this.tileSize) + 1;
        yy = (y * this.tileSize) + 1;
        element = document.createElement("div");
        element.style.left = xx + "px";
        element.style.top = yy + "px";
        this.viewport.appendChild(element);
        if (this.minefield[i]) {
          element.className = "tile mine";
        } else if (this.hints[i]) {
          element.className = "tile hint hint-"+this.hints[i];
          element.appendChild(document.createTextNode(this.hints[i]));
        } else {
          element.className = "tile empty";
        }
        if (y == h - 1) element.className += " last-row";
        if (x == w - 1) element.className += " last-column";
      }
    }

    // TODO draw buttons (but don't draw the background) and create eventListeners

  }

}
