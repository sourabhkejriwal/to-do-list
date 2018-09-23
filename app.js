// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
  //get tasks from localStorage
  document.addEventListener('DOMContentLoaded', getTasksFromLocalstorage);
  //add tasks
  form.addEventListener("submit", addTask);

  //delete single tasks
  taskList.addEventListener('click', deleteTasks);

  //delete all tasks
  //clearBtn.addEventListener('click', () => taskList.remove());
  clearBtn.addEventListener('click', deleteAllTasks);

  //filter tasks
  filter.addEventListener('keyup', filterTasks);
}

function getTasksFromLocalstorage() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks != null) {
    tasks.forEach((task) => {
      appendTasksToList(task);
    });
  };
  return tasks;
}

//add tasks
function addTask(e) {
  if (taskInput.value === '') {
    alert('please enter a value and submit');
  } else {

    appendTasksToList(taskInput.value);

    //add tasks to localStorage
    addTasksToLocalstorage(taskInput.value);

    taskInput.value = '';
  }
  taskInput.focus();
  e.preventDefault();
}

function appendTasksToList(val) {
  let taskListElement = `<li class="collection-item">${val}<a class = "delete-item secondary-content"><i class ="fa fa-remove"></i></a></li>`;

  taskList.insertAdjacentHTML('beforeend', taskListElement);
}

function addTasksToLocalstorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//delete single tasks
function deleteTasks(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    e.target.parentNode.parentNode.remove();

    //removing single item from localStorage
    currentTask = e.target.parentNode.parentNode.textContent;
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
      if (currentTask === task) {
        tasks.splice(index, 1);
        console.log(tasks);
      } 
    });
    //console.log(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

//delete all tasks
function deleteAllTasks(e) {
  // console.time('#1');
  // taskList.remove()
  // console.timeEnd('#1')

  //fastest way to remove elements
  //console.time('#2')
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  //console.timeEnd('#2')
  localStorage.removeItem('tasks');
}

//filter tasks
function filterTasks(e) {
  let tasksList = document.querySelectorAll('.collection-item'); //will be a nodelist
  filterText = e.target.value.toLowerCase();

  tasksList.forEach((task) => {
    if (task.innerText.toLowerCase().indexOf(filterText) == -1) {
      task.style.display = 'none';
    } else {
      task.style.display = 'block';
    }
  });
}