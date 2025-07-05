import "./styles.css";

const taskDiv = document.querySelector(".tasks-list");
const taskBtn = document.getElementById("task-btn");
const taskInput = document.getElementById("task-text");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function createTask(name) {
  return {
    id: crypto.randomUUID(),
    name: name,
    completed: false, // Add completed property
  };
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskDiv.innerHTML = ""; // Clear current list
  tasks.forEach((task) => {
    const ul = document.createElement("ul");
    ul.classList.add("task-ul");
    if (task.completed) ul.classList.add("completed"); // Apply completed style

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      ul.classList.toggle("completed", task.completed);
      saveTasks();
    });

    // Create task text span
    const taskText = document.createElement("span");
    taskText.innerText = task.name;

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "❌";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
      ul.remove();
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
    });

    // Append elements to ul
    ul.appendChild(checkbox);
    ul.appendChild(taskText);
    ul.appendChild(deleteBtn);
    taskDiv.appendChild(ul);
  });
}

function addTask() {
  taskBtn.addEventListener("click", () => {
    let currentTask = taskInput.value.trim();

    if (currentTask.length > 48) return alert("Only 48 characters allowed!");

    if (currentTask !== "") {
      const task = createTask(currentTask);
      tasks.push(task);
      taskInput.value = "";
      saveTasks();
      renderTasks();
    }
  });
}

function init() {
  renderTasks();
  addTask();
}

init();