import { loadState, saveState } from './storage.js';

const initial = loadState();
let todos = initial.todos;
let currentFilter = initial.filter;
let nextId = initial.nextId;

export function getTodos() {
  return todos;
}

export function getFilter() {
  return currentFilter;
}

export function setTodos(newTodos) {
  todos = newTodos;
  commit();
}

export function setFilter(filter) {
  currentFilter = filter;
  commit();
}

export function getNextId() {
  return nextId++;
}

function commit() {
  saveState({ todos, filter: currentFilter, nextId });
}