/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const Songs = require('./db/Song.js');

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());

app.use('/', express.static(path.join(__dirname, '../public/')));
app.use('/:id', express.static(path.join(__dirname, '../public/')));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get('/api/mainplayer/songs/:id', (req, res) => {
  Songs.getSong(req.params.id, (err, data) => {
    if (err) {
      console.log('error getting from DB');
      res.status(400).send();
    } else {
      console.log('server received data from DB');
      res.send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Listening from port ${port}`);
});
