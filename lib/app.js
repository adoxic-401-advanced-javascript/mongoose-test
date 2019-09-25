const express = require('express');
const app = express();

// middleware
const morgan = require('morgan');
// test route
const errorHandler = require('./middleware/error-handler');
const checkConnection = require('./middleware/check-connection');
app.use(errorHandler);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
// API ROUTES
app.get('/hello', (req, res) => {
  res.send('hello express');
});

const birds = require('./routs/birds');
app.use('/api/birds', birds);

// NOT FOUND
const api404 = require('./middleware/api-404');
app.use('/api', api404);
app.use('/', api404);

// ERRORS
app.use(checkConnection);

module.exports = app;