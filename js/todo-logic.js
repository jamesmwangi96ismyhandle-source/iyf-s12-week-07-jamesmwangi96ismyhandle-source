// Pure functions only: no document, no localStorage, no side effects.
// Every function returns a NEW array/object and never mutates its arguments.

export function addTodo(todos, text, id) {
  const trimmed = text.trim();
  if (trimmed === '') return todos.map((t) => ({ ...t }));
  return [...todos.map((t) => ({ ...t })), { id, text: trimmed, completed: false }];
}

export function toggleTodo(todos, id) {
  return todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : { ...t }));
}

export function deleteTodo(todos, id) {
  return todos.filter((t) => t.id !== id);
}

export function clearCompleted(todos) {
  return todos.filter((t) => !t.completed);
}

export function editTodo(todos, id, newText) {
  const trimmed = newText.trim();
  if (trimmed === '') return todos.map((t) => ({ ...t }));
  return todos.map((t) => (t.id === id ? { ...t, text: trimmed } : { ...t }));
}

export function filterTodos(todos, filter) {
  if (filter === 'active') return todos.filter((t) => !t.completed);
  if (filter === 'completed') return todos.filter((t) => t.completed);
  return [...todos];
}

export function countActive(todos) {
  return todos.filter((t) => !t.completed).length;
}