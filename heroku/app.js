var path = require('path');

var connect = require('connect'),
  directory = path.join(__dirname, 'public'),
  port = 8000;

connect()
  .use(connect.logger('dev'))
  .use(connect.static(directory))
  .listen(port);

console.log('Listening on port ' + port);