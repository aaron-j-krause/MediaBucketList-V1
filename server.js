'use strict';
var start = function (callback) {
  var app = require('./app');
  var models = require('./lib/models');

  app.set('port', process.env.PORT || 3000);

  models.sequelize.sync().then(function () {
    var server = app.listen(app.get('port'), function () {
      console.log('Express server listening on port ' + server.address().port);
      if(callback) {
        callback(app);
      }
    });
  });
};

if(!module.parent) {
  //running as main
  start();
} else {
  module.exports = start;
}