document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('ft_list');
  const btn = document.getElementById('newBtn');

  function loadTodos() {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('todos='));
    if (!cookie) return [];
    try {
      return JSON.parse(decodeURIComponent(cookie.split('=')[1]));
    } catch (e) {
      return [];
    }
  }

  function saveTodos(todos) {
    document.cookie = 'todos=' + encodeURIComponent(JSON.stringify(todos)) + '; path=/';
  }

  function renderTodos(todos) {
    list.innerHTML = '';
    todos.forEach(todo => {
      const div = document.createElement('div');
      div.textContent = todo;
      div.addEventListener('click', () => {
        if (confirm('Remove this TO DO?')) {
          const idx = todos.indexOf(todo);
          if (idx > -1) {
            todos.splice(idx, 1);
            saveTodos(todos);
            renderTodos(todos);
          }
        }
      });
      list.prepend(div);
    });
  }

  let todos = loadTodos();
  renderTodos(todos);

  btn.addEventListener('click', () => {
    const text = prompt('Enter new TO DO:');
    if (text && text.trim() !== '') {
      todos.unshift(text.trim());
      saveTodos(todos);
      renderTodos(todos);
    }
  });
});