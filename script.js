document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');

    // Load todos from localStorage
    loadTodos();

    addButton.addEventListener('click', () => {
        const todoText = todoInput.value.trim();
        if (todoText) {
            addTodo(todoText);
            todoInput.value = '';
        }
    });

    function addTodo(text) {
        const li = document.createElement('li');
        li.textContent = text;

        // Add complete functionality
        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTodos();
        });

        todoList.appendChild(li);
        saveTodos();
    }

    function saveTodos() {
        const todos = [];
        document.querySelectorAll('li').forEach(li => {
            todos.push({ text: li.textContent, completed: li.classList.contains('completed') });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.text;
            if (todo.completed) {
                li.classList.add('completed');
            }
            li.addEventListener('click', () => {
                li.classList.toggle('completed');
                saveTodos();
            });
            todoList.appendChild(li);
        });
    }
});