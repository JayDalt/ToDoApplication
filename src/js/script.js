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

    // Create a "Delete" button (existing)
    let span = document.createElement("span");
    span.innerHTML = "\u00d7"; // X symbol for delete
    li.appendChild(span);

    // Create an "Edit" button (new functionality)
    let editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.className = "edit-btn";
    li.appendChild(editBtn);

    listContainer.appendChild(li);
    updateTaskCount();
  }
  inputBox.value = "";
  saveData();
}

// Function to update the total task count
function updateTaskCount() {
  totalTasks.textContent = listContainer.children.length;
}

// Checked, Delete and Edit Task Functionality - 3 Buttons to be clicked
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
    } else if (e.target.classList.contains("edit-btn")) {
      editTask(e.target.parentElement); // Edit the clicked task
    }
  },
  false
);

// Save Functionality
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// Edit Task Functionality
function editTask(taskElement) {
  const currentTask = taskElement.firstChild.textContent; // Get the current task text
  const newTaskText = prompt("Edit the task:", currentTask); // Prompt for new task text
  if (newTaskText && newTaskText.trim()) {
    taskElement.firstChild.textContent = newTaskText; // Update the task text
    saveData(); // Save the updated task to localStorage
  }
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