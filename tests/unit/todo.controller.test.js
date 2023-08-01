const httpMocks = require('node-mocks-http');
const TodoController = require('../../controllers/todo.controller');
const TodoModel = require('../../models/todo.model');
const newTodo = require('../mock-data/new-todo.json');
const allTodos = require('../mock-data/all-todos.json');

TodoModel.create = jest.fn();
TodoModel.find = jest.fn();
TodoModel.findById = jest.fn();

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe('TodoController.getTodos', () => {
  it('should have a getTodos method', () => {
    expect(typeof TodoController.getTodos).toBe('function');
  });

  it('should call TodoModel.find({})', async () => {
    await TodoController.getTodos(req, res, next);
    expect(TodoModel.find).toHaveBeenCalledWith({});
  });

  it('should return response with status 200 and all todos', async () => {
    TodoModel.find.mockReturnValue(allTodos);
    await TodoController.getTodos(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(allTodos);
  });

  it('should handle errorsin getTodos', async () => {
    const errorMessage = { message: 'Error finding' };
    const rejectedPromise = Promise.reject(errorMessage);
    TodoModel.find.mockReturnValue(rejectedPromise);
    await TodoController.getTodos(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

describe('TodoController.createTodo', () => {
  beforeEach(() => {
    req.body = newTodo;
  });

  it('should have a createTodo function', () => {
    expect(typeof TodoController.createTodo).toBe('function');
  });

  it('should call TodoModel.create', () => {
    TodoController.createTodo(req, res, next);
    expect(TodoModel.create).toBeCalledWith(newTodo);
  });

  it('should return 201 response code', async () => {
    await TodoController.createTodo(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should return json body in response', async () => {
    TodoModel.create.mockReturnValue(newTodo);
    await TodoController.createTodo(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'Done property missing' };
    const rejectedPromise = Promise.reject(errorMessage);
    TodoModel.create.mockReturnValue(rejectedPromise);
    await TodoController.createTodo(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

describe('TodoController.getTodoById', () => {
  it('should have a getTodoById method', () => {
    expect(typeof TodoController.getTodoById).toBe('function');
  });

  it('should call TodoModel.finById with route paramteres', async () => {
    req.params.id = '64c8fbd448612695776ed5df';
    await TodoController.getTodoById(req, res, next);
    expect(TodoModel.findById).toBeCalledWith('64c8fbd448612695776ed5df');
  });

  it('should return json body and response code  200', async () => {
    TodoModel.findById.mockReturnValue(newTodo);
    await TodoController.getTodoById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newTodo);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'Todo is not found' };
    const rejectedPromise = Promise.reject(errorMessage);
    TodoModel.findById.mockReturnValue(rejectedPromise);
    await TodoController.getTodoById(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });

  it('should return 404 when item does not exist', async () => {
    TodoModel.findById.mockReturnValue(null);
    await TodoController.getTodoById(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});
