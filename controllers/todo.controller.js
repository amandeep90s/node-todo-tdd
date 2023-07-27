const TodoModel = require('../models/todo.model');

const createTodo = (req, res, next) => {
  TodoModel.create(req.body);
  res.status(201).send();
};

module.exports = { createTodo };
