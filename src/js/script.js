const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const totalTasks = document.getElementById("total-tasks-number");

// Add Task Functionality
function AddTask() {
  if (inputBox.value === "") {
    alert("Write something!");
  } else {
    let li = document.createElement("li");

    // Create a span for the task text and apply the task-text class
    let taskTextSpan = document.createElement("span");
    taskTextSpan.textContent = inputBox.value;
    taskTextSpan.className = "task-text"; // Apply the CSS class to limit text

    li.appendChild(taskTextSpan);

    // Create the buttons container
    let buttonsDiv = document.createElement("div");
    buttonsDiv.className = "buttons"; // Apply the buttons container CSS

    // Create the "Edit" button
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    buttonsDiv.appendChild(editBtn);

    // Create the "Delete" button
    let deleteBtn = document.createElement("span");
    deleteBtn.textContent = "\u00d7"; // X symbol for delete
    buttonsDiv.appendChild(deleteBtn);

    // Append the buttons container to the li
    li.appendChild(buttonsDiv);

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

// Checked, Delete, and Edit Task Functionality
listContainer.addEventListener(
  "click",
  (e) => {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.parentElement.remove(); // Correct parent removal for button group
      saveData();
      updateTaskCount(); // Update the task count after a task is deleted
    } else if (e.target.classList.contains("edit-btn")) {
      editTask(e.target.parentElement.parentElement); // Edit the clicked task
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
