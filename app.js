// * UI variables
const form = document.querySelector("#task-from");

const taskList = document.querySelector(".collection");
const taskInput = document.querySelector("#task");

const clearBtn = document.querySelector(".clear-tasks");
const filterInput = document.querySelector("#filter");

const createTaskElement = (item) => {
  // * Create a list item element
  const taskItem = document.createElement("li");
  taskItem.className = "collection-item";
  taskItem.innerHTML = `<span>${item}</span>`;

  // * Create a new link element
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  link.innerHTML = '<i class="fas fa-times"></i>';

  taskItem.appendChild(link);
  taskList.appendChild(taskItem);
};

const storeTaskInLocalStorage = (task) => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  if (!tasks) {
    localStorage.setItem("tasks", JSON.stringify([task]));
    return true;
  } else if (!tasks.includes(task)) {
    localStorage.setItem("tasks", JSON.stringify([...tasks, task]));
    return true;
  } else {
    return false;
  }
};

const getTasksFromLocalStorage = () => {
  console.log("DOM fully loaded and parsed");
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  if (tasks && tasks.length > 0) {
    tasks.forEach((item) => {
      createTaskElement(item);
    });
  }
};

const addTask = (event) => {
  event.preventDefault();

  if (taskInput.value) {
    if (!storeTaskInLocalStorage(taskInput.value.toLowerCase())) {
      alert("The task name has already existed!");
      return;
    }

    createTaskElement(taskInput.value.toLowerCase())
    taskInput.value = "";
  } else {
    alert("Please input a new task name!");
  }
};

const removeTask = (event) => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const target = event.target;

  if (target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?")) {
      const taskItem = target.parentElement.parentElement;
      const currentIndex = Array.from(taskList.children).indexOf(taskItem);

      // * Reove from localStorage
      if (tasks && tasks.length > 0) {
        tasks.splice(currentIndex, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }

      // * Remove from the DOM tree
      taskItem.remove();
    }
  }
};

const filterTasks = (event) => {
  const text = event.target.value.toLowerCase();
  const allTasks = taskList.querySelectorAll(".collection-item");

  allTasks.forEach((taskItem) => {
    if (!taskItem.firstElementChild.textContent.toLowerCase().includes(text)) {
      taskItem.style.display = "none";
    }
  });
};

const clearTasks = () => {
  // taskList.innerHTML = '';

  // while (taskList.firstChild) {
  //   taskList.firstChild.remove();
  // }

  while (taskList.firstElementChild) {
    taskList.removeChild(taskList.firstElementChild);
  }

  // * Clear from LocalStorage
  localStorage.clear();
};

const loadEventListeners = () => {
  window.addEventListener("DOMContentLoaded", getTasksFromLocalStorage, false);
  form.addEventListener("submit", addTask, false);
  taskList.addEventListener("click", removeTask, false);
  clearBtn.addEventListener("click", clearTasks, false);
  filterInput.addEventListener("blur", filterTasks, false);
};

// * Load all event listeners
loadEventListeners();
