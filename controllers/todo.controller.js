const TodoModel = require('../models/todo.model');

/**
 * Create a new Todo
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createTodo = async (req, res, next) => {
  try {
    const createModel = await TodoModel.create(req.body);
    res.status(201).json(createModel);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all Todos list
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getTodos = async (req, res, next) => {
  try {
    const getTodos = await TodoModel.find();
    res.status(200).json(getTodos);
  } catch (error) {
    next(error);
  }
};

module.exports = { createTodo, getTodos };
