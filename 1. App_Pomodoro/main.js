// main.js

const tasks = []; // lista de tareas en memoria

// Referencias al DOM
const form = document.getElementById('form');
const itTask = document.getElementById('itTask');
const tasksContainer = document.getElementById('tasks');

// Manejar envío del formulario
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = itTask.value.trim();
  if (!title) return;

  createTask(title);
  itTask.value = '';
  renderTasks();
});

// Crear una nueva tarea y guardarla
function createTask(title) {
  const newTask = {
    id: (Date.now().toString(36) + Math.random().toString(36).slice(2)),
    title,
    completed: false,
  };
  tasks.unshift(newTask); // al inicio
}

// Pintar la lista de tareas
function renderTasks() {
  if (tasks.length === 0) {
    tasksContainer.innerHTML = '<p class="empty">Sin tareas aún</p>';
    return;
  }

  const html = tasks.map(task => `
    <div class="task">
      <div class="completed">
        ${task.completed
          ? '<span class="done">Done</span>'
          : `<button class="start-button" data-id="${task.id}">Start</button>`}
      </div>
      <div class="title">${task.title}</div>
    </div>
  `).join('');

  tasksContainer.innerHTML = html;
}

// Delegación para botones Start
tasksContainer.addEventListener('click', (e) => {
  const btn = e.target.closest('.start-button');
  if (!btn) return;

  const id = btn.dataset.id;
  const t = tasks.find(x => x.id === id);
  if (!t) return;

  t.completed = true; // marcar como hecha (aquí luego podrías iniciar tu pomodoro)
  renderTasks();
});

// Render inicial (por si quieres mostrar "sin tareas")
renderTasks();
