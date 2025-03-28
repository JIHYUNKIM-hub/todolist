let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
let tabs = document.querySelectorAll(".task-tabs div");
let mode = "all";
let filterList = [];
let underLine = document.getElementById("under-line");

addButton.addEventListener("click", addTask);
addButton.addEventListener("touchstart", addTask);
taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  if (taskInput.value.trim() === "") {
    alert("내용을 입력해주세요");
    return;
  } else if (taskInput.value.trim() !== "") {
    let task = {
      id: randomIDGenerate(),
      taskContent: taskInput.value,
      isComplete: false,
    };
    taskList.push(task);
    render();
    taskInput.value = "";
  }
}

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
  tabs[i].addEventListener("touchstart", function (event) {
    filter(event);
  });
  tabs[i].addEventListener("click", function (event) {
    underlineIndicator(event);
  });
  tabs[i].addEventListener("touchstart", function (event) {
    underlineIndicator(event);
  });
}

function underlineIndicator(event) {
  underLine.style.width = event.target.offsetWidth + "px";
  underLine.style.left = event.target.offsetLeft + "px";
}

function render() {
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `
      <div class = "task-done-group">
      <div class="task">
            <div class = "task-done">${list[i].taskContent}</div>
            <div>
              <button onclick="toggleComplete('${list[i].id}')"><i class="fa-regular fa-square-check" style="color: #74C0FC;"></i></button>
              <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash" style="color: #a9acb2;"></i></button>
            </div>
          </div>
          </div>`;
    } else {
      resultHTML += `<div class="task">
      <div>${list[i].taskContent}</div>
      <div>
        <button onclick="toggleComplete('${list[i].id}')"><i class="fa-regular fa-square" style="color: #74C0FC;"></i></button>
        <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash" style="color: #a9acb2;"></i></button>
      </div>
    </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }

  filterList = [];
  if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (!taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
  }

  render();
}

function filter(event) {
  mode = event.target.id;
  filterList = [];

  if (mode === "all") {
    render();
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
