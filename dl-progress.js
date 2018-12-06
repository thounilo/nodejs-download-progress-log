const readline = require('readline');
const chalk = require('chalk');

const createDownloadProgress = ({
  length = 0,
  unit = 'kb'
}) => {

  const roundDecimal = (value, decimals) => {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }

  const transformBytes = (bytes, type) => {
    const unit = {
      kb: 1e+3,
      mb: 1e+6,
      gb: 1e+9
    }
    return roundDecimal(bytes / unit[type], 2)
  }
  
  let downloaded = 0

  return ({
    buffer = new Buffer(0), 
    message = '', 
    complete = false
  }) => {

    readline.cursorTo(process.stdout, 0);
    readline.clearLine(process.stdout, 1);
    downloaded += buffer.length

    if( !complete ) {
      process.stdout.write(chalk.blue(`${ message } ${ transformBytes(downloaded, unit) } / ${ transformBytes(length, unit) }${ unit }`))
    } else {
      process.stdout.write(chalk.green(complete + " " + transformBytes(length, unit) + "" + unit + "\n" ))
    }
  }
}

module.exports = createDownloadProgress
