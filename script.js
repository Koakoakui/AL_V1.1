document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');
    const todoDateInput = document.getElementById('todo-date');
    const todoTimeInput = document.getElementById('todo-time');

    // Load todos from localStorage
    loadTodos();

    addButton.addEventListener('click', () => {
        const todoText = todoInput.value.trim();
        const todoDate = todoDateInput.value;
        const todoTime = todoTimeInput.value;

        if (todoText && todoDate && todoTime) {
            const reminder = new Date(`${todoDate}T${todoTime}`);
            addTodo(todoText, reminder);
            todoInput.value = '';
            todoDateInput.value = '';
            todoTimeInput.value = '';
        }
    });

    function addTodo(text, reminder) {
        const li = document.createElement('li');
        li.textContent = text;
        li.dataset.reminder = reminder; // 儲存提醒時間

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
            todos.push({
                text: li.textContent,
                completed: li.classList.contains('completed'),
                reminder: li.dataset.reminder // 儲存提醒時間
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.text;
            li.classList.toggle('completed', todo.completed);
            li.dataset.reminder = todo.reminder; // 儲存提醒時間

            li.addEventListener('click', () => {
                li.classList.toggle('completed');
                saveTodos();
            });
            todoList.appendChild(li);
        });
    }

    function checkReminders() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        const now = new Date();

        todos.forEach(todo => {
            if (todo.reminder && new Date(todo.reminder) <= now) {
                alert(`提醒: ${todo.text}`); // 使用更好的通知方式
                todo.reminder = null; // 提醒後清除
            }
        });
        saveTodos();
    }

    // 每分鐘檢查一次
    setInterval(checkReminders, 60000);
});
