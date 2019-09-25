require('dotenv').config();
require('./lib/connect')();
const express = require('express');
const app = express();
const Bird = require('./lib/models/bird');

app.use(express.json());

app.get('/api/birds', (req, res, next) => {
  Bird.find()
    .then(birds => {
      res.json(birds);
    })
    .catch(next);
});

app.get('/api/birds/:id', (req, res, next) => {
  Bird.findById(req.params.id)
    .then(bird => {
      res.json(bird);
    })
    .catch(next);
});

app.post('/api/birds', (req, res, next) => {
  Bird.create(req.body)
    .then(bird => {
      res.json(bird);
    })
    .catch(next);
});

app.put('/api/birds/:id', (req, res, next) => {
  Bird.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
    .then(bird => {
      res.json(bird);
    })
    .catch(next);
});

app.delete('/api/birds/:id', (req, res, next) => {
  Bird.findByIdAndRemove(req.params.id)
    .then(removed => {
      res.json(removed);
    })
    .catch(next);
});

app.listen(3001, () => console.log('server running on 3000'));
