var Q = require('q');
var args = require('./args');
var buildData = require('./build-data');
var status = require('./status');
var sound = require('./sounds');
var lights = require('./lights');

buildData.init(args.url);

lights.init();
mainLoop();
setInterval(mainLoop, 2000);

function mainLoop() {
  return buildData.fetchBuildStatuses(args.jobs).then(function(statuses) {
    status.process(statuses);
    status.logCurrent();
    lights.showStatus(status.current());
    if (status.changed()) {
      status.logChange();
      (status.current() ? sound.playHappySound : sound.playSadSound)();
    };
  }).done();
}

function doEvents() {
  setTimeout(function() {}, 0);
}
