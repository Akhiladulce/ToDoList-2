let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.querySelector(".counter-cotainer p span");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  });
  deleteButton.addEventListener("click", deleteAllTasks);
  displayTasks();
});

function addTask() {
  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    todo.push({
      text: newTask,
      disabled: false,
    });
    saveToLocalStorage();
    todoInput.value = "";
    displayTasks();
  }
}

function deleteAllTasks() {
  todo = [];
  saveToLocalStorage();
  displayTasks();
}

function displayTasks() {
  todoList.innerHTML = ""; // Clear the existing list

  // Rebuild the list based on the current tasks in the todo array
  todo.forEach(function (task, index) {
    const li = document.createElement("li");
    li.textContent = task.text;
    li.addEventListener("click", function () {
      toggleTaskCompletion(index);
    });
    if (task.disabled) {
      li.classList.add("disabled");
    }
    todoList.appendChild(li);
  });

  // Update the task count
  todoCount.textContent = todo.length;
}

function toggleTaskCompletion(index) {
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTasks();
}

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}
