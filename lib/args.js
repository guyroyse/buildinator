var program = require('commander');

program
  .version('1.0.0')
  .option('-U, --url <url>', "url to Jenkins server")
  .option('-I, --interval [300]', "how often to check the status on the Jenkins server in seconds")
  .option('-J, --jobs <list>', "comma-separated list of job names to monitor", list)
  .parse(process.argv);

function list(val) {
  return val.split(',');
}

exports.url = program.url
exports.jobs = program.jobs;
exports.interval = (!program.interval ? 300 : program.interval) * 1000;
