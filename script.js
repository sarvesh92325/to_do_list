// taking control on elements of html using uqeryselector to manipulate them
const inputTask = document.querySelector('#input');
const taskList = document.getElementById('list');
const count = document.getElementById('taskCount');

// list to store todo 
let toDoList = [];

inputTask.addEventListener('click', () => {
  const place = document.querySelector('.input-container');
  const icon = document.createElement('button');
  icon.setAttribute('id', 'btn');
  icon.innerHTML = `<i class="fa fa-plus-circle add" aria-hidden="true"></i>`;
  place.append(icon);
},
  {
    once: true
  }
)

// handler function will be triggered on the click
document.addEventListener('click', handler);

// handler function
function handler(e) {
  const target = e.target;
  // console.log(e.target.className);
  if (target.className == 'fa fa-plus-circle add') {
    subButton();
  }

  if (target.className === 'fa-regular fa-circle-xmark') {
    // console.log(target.dataset.id);
    const taskId = target.dataset.id;
    deleteTask(taskId);
    return;
  }

  else if (target.className === 'check') {
    const taskId = target.id;
    markDone(taskId);
    return;
  }

  else if (target.className === 'incomplete') {
    if (toDoList.length == 0) {
      return;
    }
    for (let i = 0; i < toDoList.length; i++) {
      toDoList[i].done = false
    }
    Data();
  }

  else if (target.className === 'completed') {
    if (toDoList.length == 0) {
      return;
    }
    for (let i = 0; i < toDoList.length; i++) {
      toDoList[i].done = true
    }
    Data();
  }

  else if (target.className === 'fa-solid fa-check-double dobCheck') {
    if (toDoList.length == 0) {
      return;
    }
    for (let i = 0; i < toDoList.length; i++) {
      toDoList[i].done = true
    }
    Data();

  }
  else if (target.className === 'clear-list') {
    if (toDoList.length == 0) {
      return;
    }
    const newTasks = []
    toDoList = newTasks;
    Data();
  }
}

// this button function is to add a tasks to list
function subButton() {
  // console.log(inputTask.value);
  let value = inputTask.value;
  if (value === '') {
    alert('Enter the task');
    return;
  }

  const task = {
    name: value,
    // this date.now.tosrting function will return current timestamp in millisecond which we can use as current todo's id
    id: Date.now().toString(),
    done: false
  }

  addTask(task);

  inputTask.value = '';
}

// adding a task to the array
function addTask(task) {
  if (task) {
    toDoList.push(task);
    Data();
    return;
  }
  else {
    alert("Task Not added!");
  }
}

function Data() {
  taskList.innerHTML = '';
  if (toDoList.length == 0) {
    function notification(){
      alert("Task Deleted Successfully");
    }
    setTimeout(notification, 1000);
  }
  for (let i = 0; i < toDoList.length; i++) {
    renderList(toDoList[i]);
  }
  count.innerHTML = toDoList.length;
}

// this function is to write inner html in the unordered list
function renderList(task) {
  const li = document.createElement('li');

  li.setAttribute('class', 'task');
  li.setAttribute('data-key', task.id);

  if (task.done === true) {
    li.classList.add('checked');
  }

  li.innerHTML = `<input type="radio" class="check" id="${task.id}" ${task.done ? 'checked' : null}>

  <label for="${task.id}">${task.name}</label>
  <button class="btn">
    <i class="fa-regular fa-circle-xmark" aria-hidden="true" data-id="${task.id}"></i>
  </button>`
  taskList.append(li);
}

// this is to delete the data
function deleteTask(id) {
  const newTasks = toDoList.filter(function (task) {
    return task.id !== id
  })
  toDoList = newTasks;
  Data();
}

// this does that the task is completed or not by adding the Boolean in to the data field 
function markDone(id) {
  const task = toDoList.filter(function (task) {
    return task.id === id
  });
  if (task.length > 0) {
    const currentTask = task[0];
    currentTask.done = !currentTask.done;
    Data();
    return;
  }
}