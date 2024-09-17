//TODO Refactor the code to have cleaner methods for basic CRUD functionality

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const totalTasks = document.getElementById("total-tasks-number");

// Add Task Functionality
function AddTask() {
  if (inputBox.value === "") {
    alert("Write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    updateTaskCount();
  }
  inputBox.value = "";
  saveData();
}

// Function to update the total task count
function updateTaskCount() {
  totalTasks.textContent = listContainer.children.length;
  
}

// Checked and Delete Task Functionality
listContainer.addEventListener(
  "click",
  (e) => {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
      updateTaskCount(); // Update the task count after a task is deleted
    }
  },
  false
);

// Save Functionality
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// Delete All Tasks Functionality
function deleteAllTasks() {
  if (listContainer.children.length > 0) {
    listContainer.innerHTML = "";
    localStorage.setItem("data", "");
    updateTaskCount(); // Update the task count after deleting all tasks
  } else {
    alert("Nothing to delete!");
  }
}

// Display Tasks from Local Storage
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
  updateTaskCount(); // Show correct task count when loading from local storage
}

showTask();

// Enter Key Functionality
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    AddTask();
  }
});
