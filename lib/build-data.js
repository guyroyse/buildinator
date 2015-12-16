var Q = require('q');
var jobData = require('./job-data');

function init(url) {
  jobData.init(url);
}

function fetchStatusForJobs(jobs) {
  return jobData.fetchDataForJobs(jobs).then(function(data) {
    return data.map(function(jobData) {
      return {
        name: jobData.name,
        passed: convertColorToPassed(jobData.data.color),
        running: convertColorToRunning(jobData.data.color)
      }
    });
  });
}

function convertColorToPassed(color) {
  return color.indexOf("red") === -1;
}

function convertColorToRunning(color) {
  return color.indexOf("anime") !== -1;
}

exports.init = init;
exports.fetchStatusForJobs = fetchStatusForJobs;
