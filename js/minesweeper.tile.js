function Tile (x, y, hint) {
  this.x = x;
  this.y = y;
  this.hint = hint;
  this.isMine = (hint == "mine");
  this.isFirstRow = this.y ? 0 : 1;
  this.isFirstColumn = this.x ? 0 : 1;
  this.isLastRow = (this.y == minesweeper.rows - 1);
  this.isLastColumn = (this.x == minesweeper.columns - 1);
  this.isClicked = false;
  this.isMarked = false;
  this.create();
  this.update();
}

Tile.prototype.create = function () {

  var self = this;

  this.element = document.createElement("div");
  this.element.style.left = (this.x * minesweeper.tileSize) + 1 + "px";
  this.element.style.top = (this.y * minesweeper.tileSize) + 1 + "px";
  minesweeper.addTile(this.element);

  if (!this.isMine && this.hint) {
    this.label = document.createElement("span");
    this.label.appendChild(document.createTextNode(this.hint));
    this.element.appendChild(this.label);
  }

  this.element.addEventListener("click", function (event) {
    self.onClick(event);
  });

  this.element.addEventListener("contextmenu", function (event) {
    self.onClick(event);
  });

}

Tile.prototype.update = function (dontPropagate) {

  var neighbor;

  this.element.className = "tile";

  if (this.isMarked) {
    this.element.className += " marked";
  } else if (this.isClicked) {

    if (this.isMine) {
      this.element.className += " mine";
    } else if (this.hint) {
      this.element.className += " hint hint-"+this.hint;
    }

    if (!dontPropagate) {
      if (!this.isFirstColumn) {
        minesweeper.getTile(this.x - 1, this.y).update(true);
      }

      if (!this.isFirstRow) {
        minesweeper.getTile(this.x, this.y - 1).update(true);
      }
    }

    if (!this.isLastColumn) {
      if (minesweeper.getTile(this.x + 1, this.y).isClicked) {
        this.element.className += " border-right";
      }
    }

    if (!this.isLastRow) {
      if (minesweeper.getTile(this.x, this.y + 1).isClicked) {
        this.element.className += " border-bottom";
      }
    }

  } else {
    this.element.className += " button";
  }

  if (this.isLastRow) this.element.className += " last-row";
  if (this.isLastColumn) this.element.className += " last-column";

}

Tile.prototype.onClick = function (event) {

  if (!this.isClicked) {

    if (event && event.button == 2) {
      this.isMarked = this.isMarked ? false : true;
      event.preventDefault();
    } else {
      this.isClicked = true;

      if (this.isMine) {
        // alert("Boom...");
      } else if (this.hint == 0) {

        // automatic clearing
        var i, j, x, y, tile,
            x1 = this.isFirstColumn ? 0 : -1,
            x2 = this.isLastColumn ? 1 : 2,
            y1 = this.isFirstRow ? 0 : -1,
            y2 = this.isLastRow ? 1 : 2;

        for (i = x1; i < x2; i++) {
          for (j = y1; j < y2; j++) {
            if (i || j) {
              x = this.x + i;
              y = this.y + j;
              tile = minesweeper.getTile(x, y);
              tile.onClick();
            }
          }
        }
      }

    }

    this.update();

  }

}
