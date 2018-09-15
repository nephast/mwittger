const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mwittger', {
  keepAlive: true,
  useNewUrlParser: true
});

module.exports.User = require('./user');
