var Blink1 = require("node-blink1");
var Q = require('q');

var blink1;

function init() {
  try {
    blink1 = new Blink1.Blink1();
  } catch(err) {
    console.log("no blink1 devices found");
  }
}

function showStatus(success) {
  if (success) showGreen();
  else showRed();
}

function showGreen() {
  blink1.setRGB(0, 255, 0);
}

function showRed() {
  blink1.setRGB(255, 0, 0);
}

exports.init = init;
exports.showStatus = showStatus;
