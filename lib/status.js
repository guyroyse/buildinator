var previousSuccess = null;
var success = null;
var theStatuses = [];

function processStatuses(statuses) {
  theStatuses = statuses;

  previousSuccess = success;
  success = statuses.every(function(status) {
    return status.result.indexOf('red') === -1;
  });
}

function statusChanged() {
  return success !== previousSuccess;
}

function currentStatus() {
  return success;
}

function logCurrent() {
  console.log(new Date());
  theStatuses.forEach(function(status) {
    console.log('  ', status);
  });
  console.log(currentStatus() ? 'Build was SUCCESSFUL' : 'Build FAILED');
}

function logChange() {
  console.log(currentStatus() ? 'Build FIXED' : 'Build BROKE');
}

exports.process = processStatuses;
exports.changed = statusChanged;
exports.current = currentStatus;
exports.logCurrent = logCurrent;
exports.logChange = logChange;
