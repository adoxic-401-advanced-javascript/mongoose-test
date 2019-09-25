const connect = require('../lib/connect');
const TEST_DB_URL = 'mongodb://localhost:27017/db';
const mongoose = require('mongoose');

beforeAll(() => {
  console.log('is this before');
  return connect(TEST_DB_URL);
});

afterAll(() => {
  return mongoose.connection.close();
});
