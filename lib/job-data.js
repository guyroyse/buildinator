var Q = require('q');
var request = require('request-json');

var client;

function init(url) {
  client = request.createClient(url);
}

function fetchDataForJob(job) {
  var deferred = Q.defer();
  client.get('job/' + job + '/api/json', function(err, res, data) {
    if (err) deferred.reject(err);
    else deferred.resolve(data);
  });
  return deferred.promise;
}

function fetchDataForJobs(jobs) {
  return Q.all(jobs.map(function(job) {
    return fetchDataForJob(job).then(function(data) {
      return {
        name: job,
        data: data
      };
    });
  }));
}

exports.init = init;
exports.fetchDataForJobs = fetchDataForJobs;
