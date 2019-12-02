const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const Songs = require('./db/Song.js')

app.use('/', express.static(path.join(__dirname, '../public/index.html')));

app.get('/api/songs', (req, res) => {
  Songs.get((err, data) => {
    if (err) {
      console.log('error getting from DB');
      res.status(400).send();
    } else {
      console.log('server received data from DB');
      res.send(data);
    }
  })
})

app.listen(port, ()=> {
  console.log(`Listening from port ${port}`)
});