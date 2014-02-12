var connect = require('connect'),
  directory = 'public',
  port = 8000;

connect()
  .use(connect.logger('dev'))
  .use(connect.static(directory))
  .listen(port);

console.log('Listening on port ' + port);