
import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  addTodo,
  toggleTodo,
  deleteTodo,
  clearCompleted,
  editTodo,
  filterTodos,
  countActive,
} from '../js/todo-logic.js';

test('addTodo appends a trimmed todo', () => {
  const result = addTodo([], '  Buy milk  ', 1);
  assert.deepEqual(result, [
    { id: 1, text: 'Buy milk', completed: false },
  ]);
});

test('addTodo ignores empty or whitespace-only input', () => {
  const result = addTodo([], '   ', 1);
  assert.deepEqual(result, []);
});

test('addTodo does not mutate the original array', () => {
  const original = [{ id: 1, text: 'First', completed: false }];
  const result = addTodo(original, 'Second', 2);

  assert.deepEqual(original, [
    { id: 1, text: 'First', completed: false },
  ]);
  assert.equal(result.length, 2);
  assert.notEqual(result, original);
});

test('toggleTodo flips completed without mutating input', () => {
  const original = [{ id: 1, text: 'A', completed: false }];
  const result = toggleTodo(original, 1);

  assert.equal(result[0].completed, true);
  assert.equal(original[0].completed, false);
});

test('deleteTodo removes the given id', () => {
  const todos = [
    { id: 1, text: 'A', completed: false },
    { id: 2, text: 'B', completed: false },
  ];

  assert.deepEqual(deleteTodo(todos, 1), [
    { id: 2, text: 'B', completed: false },
  ]);
});

test('clearCompleted removes completed todos', () => {
  const todos = [
    { id: 1, text: 'A', completed: true },
    { id: 2, text: 'B', completed: false },
  ];

  assert.deepEqual(clearCompleted(todos), [
    { id: 2, text: 'B', completed: false },
  ]);
});

test('editTodo updates todo text without mutating input', () => {
  const original = [{ id: 1, text: 'Old task', completed: false }];
  const result = editTodo(original, 1, '  New task  ');

  assert.equal(result[0].text, 'New task');
  assert.equal(original[0].text, 'Old task');
});

test('filterTodos and countActive work by completion state', () => {
  const todos = [
    { id: 1, text: 'A', completed: true },
    { id: 2, text: 'B', completed: false },
  ];

  assert.equal(filterTodos(todos, 'active').length, 1);
  assert.equal(filterTodos(todos, 'completed').length, 1);
  assert.equal(countActive(todos), 1);
});
