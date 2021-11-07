// * UI variables
const form = document.querySelector("#task-from");

const taskList = document.querySelector(".collection");
const taskInput = document.querySelector("#task");

const clearBtn = document.querySelector(".clear-tasks");
const filterInput = document.querySelector("#filter");

// * Get all Tasks from localStorage
const getTasks = () => {
  console.log("DOM fully loaded and parsed");
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  if (tasks.length > 0) {
    tasks.forEach((task) => {
      // * Create a list item element
      const taskItem = document.createElement("li");
      taskItem.className = "collection-item";
      taskItem.innerHTML = `<span>${task}</span>`;

      // * Create a new link element
      const link = document.createElement("a");
      link.className = "delete-item secondary-content";
      link.innerHTML = '<i class="fas fa-times"></i>';

      taskItem.appendChild(link);
      taskList.appendChild(taskItem);
    });
  }
};

// * Storage a new Task
const storeTaskInLocalStorage = (task) => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  if (!tasks) {
    localStorage.setItem("tasks", JSON.stringify([task]));
    return true;
  } else if (!tasks.includes(task)) {
    localStorage.setItem("tasks", JSON.stringify([...tasks, task]));
    return true;
  }

  return false;
};

// * Add a new Task
const addTask = (event) => {
  event.preventDefault();

  if (taskInput.value) {
    if (!storeTaskInLocalStorage(taskInput.value)) {
      alert("The task name has already existed!");
      return;
    }

    const taskItem = document.createElement("li");
    taskItem.className = "collection-item";
    taskItem.innerHTML = `<span>${taskInput.value}</span>`;

    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fas fa-times"></i>';

    taskItem.appendChild(link);
    taskList.appendChild(taskItem);

    taskInput.value = "";
  } else {
    alert("Please input a new task name!");
  }
};

// * Remove a Task
const removeTask = (event) => {
  if (event.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?")) {
      event.target.parentElement.parentElement.remove();
    }
  }
};

// * Clear all Tasks
const clearTasks = () => {
  // taskList.innerHTML = '';

  // while (taskList.firstChild) {
  //   taskList.firstChild.remove();
  // }

  while (taskList.firstElementChild) {
    taskList.removeChild(taskList.firstElementChild);
  }
};

// * Filter Tasks
const filterTasks = (event) => {
  const text = event.target.value.toLowerCase();
  const allTasks = taskList.querySelectorAll(".collection-item");

  allTasks.forEach((taskItem) => {
    if (!taskItem.firstElementChild.textContent.toLowerCase().includes(text)) {
      taskItem.style.display = "none";
    }
  });
};

const loadEventListeners = () => {
  window.addEventListener("DOMContentLoaded", getTasks, false);
  form.addEventListener("submit", addTask, false);
  taskList.addEventListener("click", removeTask, false);
  clearBtn.addEventListener("click", clearTasks, false);
  filterInput.addEventListener("blur", filterTasks, false);
};

// * Load all event listeners
loadEventListeners();
