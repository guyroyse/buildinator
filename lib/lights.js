var Blink1 = require("node-blink1");
var Q = require('q');

var blink1 = new Blink1.Blink1();

var greenBlinkingStart = 0;
var greenBlinkingEnd = 1;

var redBlinkingStart = 2;
var redBlinkingEnd = 3;

blink1.writePatternLine(200, 255, 0, 0, 0);
blink1.writePatternLine(200, 0, 0, 0, 1);

blink1.writePatternLine(200, 0, 255, 0, 2);
blink1.writePatternLine(200, 0, 0, 0, 3);

function showStatus(passed, running) {
  if (passed && running) showGreenBlinking();
  if (passed && !running) showGreen();
  if (!passed && running) showRedBlinking();
  if (!passed && !running) showRed();
}

function showGreenBlinking() {
  blink1.playLoop(greenBlinkingStart, greenBlinkingEnd, 0);
}

function showGreen() {
  blink1.pause();
  blink1.setRGB(0, 255, 0);
}

function showRedBlinking() {
  blink1.playLoop(redBlinkingStart, redBlinkingEnd, 0);
}

function showRed() {
  blink1.pause();
  blink1.setRGB(255, 0, 0);
}

exports.showStatus = showStatus;
