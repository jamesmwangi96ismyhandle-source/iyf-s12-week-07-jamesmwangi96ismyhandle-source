// DOM Elements
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const itemsLeft = document.getElementById('items-left');
const filters = document.querySelectorAll('.filter');
const clearCompletedBtn = document.getElementById('clear-completed');

// State - array of objects
let todos = [];
let currentFilter = 'all';
let nextId = 1;

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

function renderTodos() {
  todoList.textContent = '';

  let filtered = todos;
  if (currentFilter === 'active') {
    filtered = todos.filter(t => !t.completed);
  } else if (currentFilter === 'completed') {
    filtered = todos.filter(t => t.completed);
  }

  filtered.forEach(todo => {
    todoList.appendChild(createTodoElement(todo));
  });

  updateStats();
}

function addTodo(text) {
  const trimmed = text.trim();
  if (trimmed === '') return;

  todos.push({ id: nextId++, text: trimmed, completed: false });
  renderTodos();
}

function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    renderTodos();
  }
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  renderTodos();
}

function updateStats() {
  const activeCount = todos.filter(t => !t.completed).length;
  itemsLeft.textContent = `${activeCount} item${activeCount === 1 ? '' : 's'} left`;
}

function filterTodos(filter) {
  currentFilter = filter;
  filters.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  renderTodos();
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  addTodo(input.value);
  input.value = '';
});

todoList.addEventListener('click', function (event) {
  const delBtn = event.target.closest('.delete-btn');
  const li = event.target.closest('li');
  if (!li) return;
  const id = Number(li.dataset.id);
  if (delBtn) {
    deleteTodo(id);
    return;
  }
  toggleTodo(id);
});

todoList.addEventListener('dblclick', function (event) {
  const li = event.target.closest('li');
  if (!li || event.target.closest('.delete-btn')) return;
  const id = Number(li.dataset.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return;
  const span = li.querySelector('.task-text');
  const editInput = document.createElement('input');
  editInput.className = 'edit-input';
  editInput.value = todo.text;
  li.replaceChild(editInput, span);
  editInput.focus();
  function save() {
    const newText = editInput.value.trim();
    if (newText !== '') todo.text = newText;
    renderTodos();
  }
  function cancel() {
    renderTodos();
  }
  editInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') save();
    if (e.key === 'Escape') cancel();
  });
  editInput.addEventListener('blur', save);
});

filters.forEach(btn => {
  btn.addEventListener('click', function () {
    filterTodos(btn.dataset.filter);
  });
});

clearCompletedBtn.addEventListener('click', function () {
  todos = todos.filter(t => !t.completed);
  renderTodos();
});

renderTodos();
