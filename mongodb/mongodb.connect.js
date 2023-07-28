const mongoose = require('mongoose');

const databaseName = 'todo-tdd';

const url = `mongodb://localhost:27017/${databaseName}`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connect = () => {
  mongoose
    .connect(url, options)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
};

module.exports = { connect };
