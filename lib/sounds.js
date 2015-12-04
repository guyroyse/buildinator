var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');

function playSound(filename) {
  fs.createReadStream(filename)
    .pipe(new lame.Decoder())
    .on('format', function (format) {
      var speaker = new Speaker(format);
      this.pipe(speaker);
  });
}

function playSoundFn(filename) {
  return function() {
    return playSound(filename);
  }
}

exports.playHappySound = playSoundFn('success.mp3');
exports.playSadSound = playSoundFn('failure.mp3');
