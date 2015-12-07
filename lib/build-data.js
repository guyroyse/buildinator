var Q = require('q');
var jenkins = require('jenkins');

var jenkinsApi;

function init(url) {
  jenkinsApi = jenkins(url);
}

function fetchBuildStatuses(jobs) {
  return Q.all(jobs.map(function(jobName) {
    return getJob(jobName).then(function(jobData) {
      return {
        name: jobData.name,
        result: jobData.color
      }
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
