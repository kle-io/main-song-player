const mongoose = require('mongoose');

const uri = 'mongodb://localhost/kleiomainplayer';

const db = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = db;

