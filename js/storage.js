// All localStorage access lives here.
const STORAGE_KEY = 'todo-app-state';

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { todos: [], filter: 'all', nextId: 1 };

    const parsed = JSON.parse(raw);
    const todos = Array.isArray(parsed.todos)
      ? parsed.todos.filter(
          (t) =>
            t &&
            typeof t.id === 'number' &&
            typeof t.text === 'string' &&
            typeof t.completed === 'boolean'
        )
      : [];
    const filter = ['all', 'active', 'completed'].includes(parsed.filter)
      ? parsed.filter
      : 'all';
    const nextId =
      typeof parsed.nextId === 'number'
        ? parsed.nextId
        : todos.reduce((max, t) => Math.max(max, t.id), 0) + 1;

    return { todos, filter, nextId };
  } catch {
    // Corrupt JSON or storage unavailable — start clean.
    return { todos: [], filter: 'all', nextId: 1 };
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or blocked — ignore, app still works in memory.
  }
}