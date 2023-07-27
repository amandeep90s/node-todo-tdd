const TodoController = require('../../controllers/todo.controller');
const TodoModel = require('../../models/todo.model');
const httpMocks = require('node-mocks-http');

TodoModel.create = jest.fn();

describe('TodoController.createTodo', () => {
  it('should have a createTodo function', () => {
    expect(typeof TodoController.createTodo).toBe('function');
  });

  it('should call TodoModel.create', () => {
    let req = httpMocks.createRequest();
    let res = httpMocks.createResponse();
    let next = null;

    TodoController.createTodo(req, res, next);
    expect(TodoModel.create).toBeCalled();
  });
});
