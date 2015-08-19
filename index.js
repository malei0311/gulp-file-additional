var chalk = require('chalk');
var map   = require('map-stream');
var _ = require('lodash');

module.exports = function(options) {
  var defaults = {
    logfile: {
      on: true,
      prefix: 'Using file',
      color: 'magenta',
      path: 'cwd'
    },
    additional: {
      on: true,
      prefix: 'Additional data',
      color: 'magenta',
      data: {},
    }
  },
  paths = 'path relative'.split(' '),
  colors = 'black blue cyan gray green red white yellow'.split(' ');

  options = _.merge({}, defaults, options);

  function processLogfile(file, options) {
    if(!options.on) {
      return;
    }
    if(!_.includes(paths, options.path)) {
      options.path = defaults.logfile.path;
    }
    if(!_.includes(colors, options.color)) {
      options.color = defaults.logfile.color;
    }
    var _filePath;
    switch(options.path) {
      case 'cwd':
        _filePath = file.path.replace(file.cwd, '.');
        break;
      default:
        _filePath = file[options.path];
    }
    console.log(chalk.green('[gulp]'), options.prefix, chalk[options.color](_filePath))
  }

  function processData(data, file, options) {
    if(_.isFunction(data.value)) {
      data.value = (data.value)(file.path);
    }
    if(!data.key || !data.value) {
      return;
    }
    file[data.key + ''] = data.value;
    console.log(chalk.cyan('[gulp]'), options.prefix, chalk[options.color](JSON.stringify(data)))
  };

  function processAdditional(file, options) {
    if(!options.on || !_.isObject(options.data)) {
      return;
    }
    if(_.isArray(options.data)) {
      _.forEach(options.data, function(value, key){
        processData(value, file, options);
      });
    }
    if(_.isPlainObject(options.data)) {
      processData(options.data, file, options);
    }
  }

  return map(function(file, cb) {
    processLogfile(file, options.logfile);
    processAdditional(file, options.additional);
    cb(null, file);
  });
}
