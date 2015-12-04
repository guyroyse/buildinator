var Q = require('q');
var jenkins = require('jenkins');

var jenkinsApi;

function init(url) {
  jenkinsApi = jenkins(url);
}

function fetchBuildStatuses(jobs) {
  return Q.all(jobs.map(function(jobName) {
    return getJob(jobName).then(function(jobData) {
      return jobData.lastBuild.number
    }).then(function(buildNumber) {
      return getBuild(jobName, buildNumber);
    }).then(function(buildData) {
      return {
        name: jobName,
        result: buildData.result
      };
    });
  }));
}

function getJob(job) {
  var deferred = Q.defer();
  jenkinsApi.job.get(job, function(err, data) {
    if (err) deferred.reject(err);
    else deferred.resolve(data);
  });
  return deferred.promise;
}

function getBuild(job, build) {
  var deferred = Q.defer();
  jenkinsApi.build.get(job, build, function(err, data) {
    if (err) deferred.reject(err);
    else deferred.resolve(data);
  });
  return deferred.promise;
}

exports.init = init;
exports.fetchBuildStatuses = fetchBuildStatuses;
