var Q = require('q');
var args = require('./args');
var buildData = require('./build-data');
var status = require('./status');
var lights = require('./lights');

buildData.init(args.url);

mainLoop();
setInterval(mainLoop, args.interval);

function mainLoop() {
  return buildData.fetchStatusForJobs(args.jobs).then(function(data) {
    var status = collapseData(data);
    logStatus(status);
    lights.showStatus(status.passed, status.running);
  }).done();
}

function collapseData(data) {
  return data.reduce(function(memo, datum) {
    return {
      passed : memo.passed && datum.passed,
      running : memo.running || datum.running
    }
    return status.result.indexOf('red') === -1;
  }, {
    passed : true,
    running : false
  });
}

function logStatus(status) {
  console.log(new Date(), 'Passed: ' + status.passed, 'Running: ' + status.running );
}
