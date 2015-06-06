function Digit (counter) {
  this.counter = counter;

  this.element = document.createElement("div");
  this.counter.addDigitElement(this.element);
  this.element.innerHTML = "0<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9";
  this.setValue(0);
}

Digit.prototype.setValue = function (value) {
  this.element.className = "digit digit-"+value;
}
