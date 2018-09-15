const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = promise;
mongoose.connect('mongodb://localhost/mwittger', {
  keepAlive: true,
  useMongoClient: true
});
