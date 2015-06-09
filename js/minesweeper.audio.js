minesweeper.audio = {

  init: function () {
    this.src = {};
    this.src.tap = [];
    this.src.tap.push(document.getElementById("audio-tap-1"));
    this.src.tap.push(document.getElementById("audio-tap-2"));
    this.src.tap.push(document.getElementById("audio-tap-3"));
    this.src.tap.push(document.getElementById("audio-tap-4"));
  },

  play: function (label) {
    if (this.src[label] && !this.src[label].error) {
      if (this.src[label].length) {
        var r = Math.floor(Math.random() * this.src[label].length);
        this.src[label][r].play();
      } else {
        this.src[label].play();
      }
    }
  }

}
