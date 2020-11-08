let addServerButton = document.getElementById("addServerButton");
let deleteServerButton = document.getElementById("deleteServerButton");

let serverContainer = document.getElementById("serverContainer");
let taskContainer = document.getElementById("taskContainer");

let noOfTasks = document.getElementById("addTaskBox");

let servers = [];

let tasks = [];

const addServer = () => {
  deleteServerButton.disabled = false;
  if (servers.length >= 10) return;

  servers.push({
    id: `s${servers.length}`,
    text: `-`,
    isBusy: false
  });

  let server = document.createElement("div");
  server.setAttribute("class", "server");
  server.setAttribute("id", `s${servers.length - 1}`);
  server.innerHTML = `${servers[servers.length - 1].text}`;
  serverContainer.appendChild(server);

  if (servers.length === 9) {
    addServerButton.disabled = true;
  }
};

const removeServer = () => {
  addServerButton.disabled = false;
  if (servers.length <= 1) return;

  let serverList = document.getElementsByClassName("server");
  serverList[serverList.length - 1].remove();

  servers.pop();

  if (servers.length === 1) {
    deleteServerButton.disabled = true;
  }
};

const addTasks = () => {
  let count = noOfTasks.value;

  for (let i = 0; i < count; i++) {
    let obj = {
      id: `t${tasks.length}`,
      text: `Task ${tasks.length + 1}`,
      isExecuting: false
    };
    tasks.push(obj);
    let task = document.createElement("div");
    task.setAttribute("class", "tasks");
    task.setAttribute("id", `${obj.id}`);
    task.innerHTML = `${obj.text}`;
    let taskId = `${obj.id}`; // ${taskId}
    task.innerHTML += `<button class="deleteBtn" onclick='deleteTask(${taskId})'>Delete</button>`;
    taskContainer.appendChild(task);
  }
};

const deleteTask = (task) => {
  let taskToBeDeleted = document.getElementsByClassName("tasks")[0];
  let id = taskToBeDeleted.id;

  // console.log(task);
  // let taskId = task.id;
  // task.parentNode.removeChild(task);
  tasks = tasks.filter((task) => task.id !== id);
  taskToBeDeleted.remove();

  // let taskToBeDeleted = document.getElementById(taskId);
  // taskToBeDeleted.parentNode.removeChild(taskToBeDeleted);
  // rearrange();
};

const rearrange = () => {
  let i = 0;
  tasks.map((task) => {
    task.id = `t${i++}`;
    // task.text = `${task.text}`;
  });
};

const initServers = () => {
  servers.push({
    id: "s0",
    text: "-",
    isBusy: false
  });
  let server = document.createElement("div");
  server.setAttribute("class", "server");
  server.setAttribute("id", `s${servers.length - 1}`);
  server.innerHTML = `${servers[servers.length - 1].text}`;
  serverContainer.appendChild(server);
};

initServers();

const checkFreeServers = () => {
  for (let i = 0; i < servers.length; i++) {
    if (!servers[i].isBusy) {
      pushTaskToServer(i);
      // console.log("pushing");
    }
  }
};

setInterval(checkFreeServers, 1000);

const pushTaskToServer = (index) => {
  for (let i = 0; i < tasks.length; i++) {
    if (!tasks[i].isExecuting) {
      document
        .getElementsByClassName("tasks")
        [i].getElementsByTagName("button")[0].disabled = true;
      servers[index].isBusy = true;
      servers[index].text = tasks[i].text;
      document.getElementById(`s${index}`).innerHTML = `${tasks[i].text}`;
      tasks[i].isExecuting = true;
      setTimeout(() => clearServer(index, i), 5000);
      break;
    }
  }
};

const clearServer = (index, taskId) => {
  servers[index].isBusy = false;
  servers[index].text = "-";
  // tasks[taskId].isExecuting = false;
  document.getElementById(`s${index}`).innerHTML = `-`;
  // let deletedTask = document.getElementById(`t${taskId}`);
  deleteTask();
};
