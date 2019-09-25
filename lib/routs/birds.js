/* eslint-disable new-cap */
const router = require('express').Router();

const Bird = require('../models/bird');

router
  .get('/', (req, res, next) => {
    console.log('hi');
    Bird.find()
      .then(birds => {
        res.json(birds);
      })
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Bird.findById(req.params.id)
      .then(bird => {
        res.json(bird);
      })
      .catch(next);
  })

  .post('/', (req, res, next) => {
    Bird.create(req.body)
      .then(bird => {
        res.json(bird);
      })
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Bird.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .then(bird => {
        res.json(bird);
      })
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Bird.findByIdAndRemove(req.params.id)
      .then(removed => {
        res.json(removed);
      })
      .catch(next);
  });

module.exports = router;