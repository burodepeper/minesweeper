function Counter (selector, digits) {
  this.value = 0;
  this.length = digits;
  this.element = document.getElementById(selector);
  this.digits = [];
  for (var i = 0; i < digits; i++) {
    this.digits.push(new Digit(this));
  }
}

Counter.prototype.addDigitElement = function (element) {
  this.element.appendChild(element);
}

Counter.prototype.setValue = function (value) {
  this.value = value;
  this.update();
}

Counter.prototype.update = function () {
  var i, value = strpad(this.value, this.length);
  for (i = 0; i < this.length; i++) {
    this.digits[i].setValue(value[i]);
  }
}

function strpad (str, length) {
  var i, l;
  str = str + "";
  l = length - str.length;
  for (i = 0; i < l; i++) {
    str = "0" + str;
  }
  return str;
}
