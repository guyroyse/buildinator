var program = require('commander');

program
  .version('1.0.0')
  .option('--url <url>', "url to Jenkins server")
  .option('--jobs <list>', "comma-separated list of job names to monitor", list)
  .parse(process.argv);

function list(val) {
  return val.split(',');
}

exports.url = program.url
exports.jobs = program.jobs;
