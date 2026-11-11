import {
  addTodo,
  toggleTodo,
  deleteTodo,
  clearCompleted,
  editTodo,
  filterTodos,
  countActive,
} from './todo-logic.js';
import { getTodos, getFilter, setTodos, setFilter, getNextId } from './state.js';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const itemsLeft = document.getElementById('items-left');
const filters = document.querySelectorAll('.filter');
const clearCompletedBtn = document.getElementById('clear-completed');

function createTodoElement(todo) {
  const li = document.createElement('li');
  li.dataset.id = todo.id;
  li.classList.toggle('completed', todo.completed);

  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = todo.text;

  const delBtn = document.createElement('button');
  delBtn.className = 'delete-btn';
  delBtn.textContent = 'Delete';

  li.appendChild(span);
  li.appendChild(delBtn);
  return li;
}

export function render() {
  todoList.textContent = '';
  filterTodos(getTodos(), getFilter()).forEach((todo) => {
    todoList.appendChild(createTodoElement(todo));
  });
  filters.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.filter === getFilter());
  });
  const active = countActive(getTodos());
  itemsLeft.textContent = `${active} item${active === 1 ? '' : 's'} left`;
}

export function initUI() {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    setTodos(addTodo(getTodos(), input.value, getNextId()));
    input.value = '';
    render();
  });

  todoList.addEventListener('click', (event) => {
    const delBtn = event.target.closest('.delete-btn');
    const li = event.target.closest('li');
    if (!li) return;
    const id = Number(li.dataset.id);
    if (delBtn) {
      setTodos(deleteTodo(getTodos(), id));
      render();
      return;
    }
    setTodos(toggleTodo(getTodos(), id));
    render();
  });

  todoList.addEventListener('dblclick', (event) => {
    const li = event.target.closest('li');
    if (!li || event.target.closest('.delete-btn')) return;
    const id = Number(li.dataset.id);
    const todo = getTodos().find((t) => t.id === id);
    if (!todo) return;

    const span = li.querySelector('.task-text');
    const editInput = document.createElement('input');
    editInput.className = 'edit-input';
    editInput.value = todo.text;
    li.replaceChild(editInput, span);
    editInput.focus();

    const save = () => {
      setTodos(editTodo(getTodos(), id, editInput.value));
      render();
    };
    const cancel = () => render();

    editInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') save();
      if (e.key === 'Escape') cancel();
    });
    editInput.addEventListener('blur', save);
  });

  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      setFilter(btn.dataset.filter);
      render();
    });
  });

  clearCompletedBtn.addEventListener('click', () => {
    setTodos(clearCompleted(getTodos()));
    render();
  });

  render();
}