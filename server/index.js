/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const Songs = require('./db/Song.js');


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../public/')));

app.get('/api/songs', (req, res) => {
  Songs.getAllSongs((err, data) => {
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
