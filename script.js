document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    loadTasks();

    // Add task on button click
    addButton.addEventListener('click', () => {
        addTask(taskInput.value.trim());
    });

    // Add task on pressing Enter
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value.trim());
        }
    });

    // Load tasks from localStorage and render them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Save updated task array to localStorage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add task to DOM and optionally save to localStorage
    function addTask(taskText, save = true) {
        if (taskText === '') return;

        // Create <li> element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create "Remove" button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');  // ✅ Use classList.add

        // Set remove functionality
        removeBtn.onclick = () => {
            taskList.removeChild(li);  // ✅ Remove from DOM

            // Update localStorage
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = tasks.filter(task => task !== taskText);
            saveTasks(updatedTasks);
        };

        // Append button to li, and li to taskList
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input
        taskInput.value = '';

        // Save task if needed
        if (save) {
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            tasks.push(taskText);
            saveTasks(tasks);
        }
    }
});
