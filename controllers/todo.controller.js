const TodoModel = require('../models/todo.model');

const createTodo = (req, res, next) => {
  TodoModel.create(req.body);
};

module.exports = { createTodo };
