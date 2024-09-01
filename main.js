const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const inputEdit = document.getElementById("input-edit");

let editItemId = null;
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const toastSuccess = (message) => {
  Toastify({
    text: message,
    duration: 2000,
    style: {
      paddingTop: "10px",
      margin: "20px",
      background: "rgb(79, 179, 79)",
      borderRadius: "10px",
      width: "200px",
      height: "50px",
      fontSize: "20px",
      textAlign: "center",
      color: "white",
      position: "fixed",
    },
  }).showToast();
};

const toastError = (message) => {
  Toastify({
    text: message,
    duration: 2000,
    style: {
      paddingTop: "10px",
      margin: "20px",
      background: "rgb(201, 68, 68)",
      borderRadius: "10px",
      width: "200px",
      height: "50px",
      fontSize: "20px",
      textAlign: "center",
      color: "white",
      position: "fixed",
    },
  }).showToast();
};

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(index) {
  tasks.splice(index, 1);
  showTasks();
  saveTasks();
  toastSuccess("Vazifa o'chirildi!");
}

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    toastError("Vazifa kiritilmadi!");
    return;
  }

  tasks.push({ text: taskText, isCompleted: false });
  taskInput.value = "";

  showTasks();
  saveTasks();
  toastSuccess("Vazifa qo'shildi!");
}

function showTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="task-text ${task.isCompleted ? " text-secondary text-decoration-line-through" : ""}" onclick="toggleComplete(${index})">
        ${index + 1}. ${task.text}
      </span>
      <hr>
      <div class="all">
        <button class="btn border-0 p-0 me-2 edit-btn" onclick="editTask(${index})">
          <i class="fa-solid fa-pencil"></i>
        </button>
        <button class="btn border-0 p-0" onclick="deleteTask(${index})">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function toggleComplete(index) {
  tasks[index].isCompleted = !tasks[index].isCompleted;
  showTasks();
  saveTasks();
}

function editTask(id) {
  editItemId = id;
  inputEdit.value = tasks[id].text;
  openModal();
  toastSuccess("Vazifa o'zgartirildi!");
}

function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

function saveEdit(event) {
  const newText = inputEdit.value.trim();
  if (newText === "") {
    alert("Vazifani o'zgartiring!!!");
    return;
  }
  tasks[editItemId].text = newText;
  showTasks();
  saveTasks();
  closeModal();
}

showTasks();

