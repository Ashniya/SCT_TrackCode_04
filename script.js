const taskForm = document.getElementById("taskForm");
const taskListContainer = document.getElementById("taskListContainer");
const toggleModeBtn = document.getElementById("toggleMode");
const body = document.body;

let tasks = [];
let editingTaskId = null;

toggleModeBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const desc = document.getElementById("desc").value.trim();
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const priority = document.getElementById("priority").value;

  if (editingTaskId) {
    // Edit existing task
    tasks = tasks.map(task =>
      task.id === editingTaskId
        ? { ...task, title, desc, date, time, priority }
        : task
    );
    editingTaskId = null;
  } else {
    // Add new task
    const task = {
      id: Date.now(),
      title,
      desc,
      date,
      time,
      priority,
      completed: false,
    };
    tasks.push(task);
  }

  taskForm.reset();
  renderTasks();
});

function renderTasks() {
  taskListContainer.innerHTML = "";

  tasks.forEach((task) => {
    const taskEl = document.createElement("div");
    taskEl.className = "task-item";

    taskEl.innerHTML = `
      <h3 class="font-bold">${task.title}</h3>
      <p>${task.desc}</p>
      <p class="text-sm">📅 ${task.date} ⏰ ${task.time}</p>
      <p class="text-sm">Priority: ${task.priority}</p>
      <div class="task-actions">
        ${
          task.completed
            ? `<button class="undo-btn" onclick="undoTask(${task.id})">Undo Complete</button>`
            : `<button class="complete-btn" onclick="completeTask(${task.id})">Complete</button>`
        }
        <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;

    taskListContainer.appendChild(taskEl);
  });
}

function completeTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: true } : task
  );
  renderTasks();
}

function undoTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: false } : task
  );
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  document.getElementById("title").value = task.title;
  document.getElementById("desc").value = task.desc;
  document.getElementById("date").value = task.date;
  document.getElementById("time").value = task.time;
  document.getElementById("priority").value = task.priority;

  editingTaskId = id;
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}
