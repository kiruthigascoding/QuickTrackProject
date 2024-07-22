

let timerMode = document.getElementById("timer-mode");
let manualMode =document.getElementById("manual-mode");
let timerBtn = document.getElementById("timer-btn");
let manualBtn = document.getElementById("manual-btn");
let manualTaskName = document.getElementById("task1");

let inputTask = document.getElementById("task");
let startButton = document.getElementById("startButton");
let taskName = document.getElementById("task-name");
let stopButton = document.getElementById("stopButton");
let startClock = document.getElementById("startClock");
let addButton = document.getElementById("add");




updatedTaskList();


addButton.addEventListener("click", () => {

  console.log("Add button is clicked");
  
 
  let manualStartDateTime = document.getElementById("manualStartDateTime").value;
  let manualStopDateTime = document.getElementById("manualStopDateTime").value;

  let manualStartDate = new Date(manualStartDateTime);
  let manualStopDate = new Date(manualStopDateTime);

  let taskTimeMs = Math.abs(manualStopDate - manualStartDate);
    
  let taskList = JSON.parse(localStorage.getItem('taskDetails')) || [] ;
   console.log(document.getElementById("task").value)
  let taskEntry = {
    Name: manualTaskName.value,
    start:formatDateTime(manualStartDate),
    stop: formatDateTime(manualStopDate),
    time: formatTime(taskTimeMs),
  };

  taskList.push(taskEntry);
  
  localStorage.setItem('taskDetails', JSON.stringify(taskList));
  console.log("log saved in to localStorage: " ,taskEntry);
  
  updatedTaskList();
     

 })

timerBtn.addEventListener('click', function() {
  timerMode.classList.add('active');
  manualMode.classList.remove('active');
});

manualBtn.addEventListener('click', function() {
  timerMode.classList.remove('active');
  manualMode.classList.add('active');
});

let tInterval, running = false;
let startTime, upDatedTime,stopTime,difference = 0,tasktime = 0;


function getCurrentEpochTimeStamp(){
  return Date.now();
}

function formatTime(epochTime){
  let seconds = Math.floor((epochTime/1000) % 60) ;
  let minutes =  Math.floor((epochTime/ (1000 * 60 )) % 60) ;
  let hours=  Math.floor((epochTime/ (1000 * 60 * 60 )) % 24) ;
  hours = hours < 10 ? '0'+ hours : hours;
  minutes = minutes < 10 ? '0'+ minutes : minutes;
  seconds = seconds < 10 ? '0'+ seconds : seconds;
  
  return `${hours}:${minutes}:${seconds}`;
  
}
function formatDateTime(epochTime) {
    let date = new Date(epochTime);
    let hours = date.getHours().toString().padStart(2,'0');
    let minutes = date.getMinutes().toString().padStart(2,'0');
    let day = date.getDate().toString().padStart(2,'0');
    let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
                    'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let monthName = monthNames[date.getMonth()];
    let year = date.getFullYear();
    let formattedTime = `${hours}:${minutes} | ${day} ${monthName} ${year}`;
    return formattedTime;
}

function addTask(){
  let taskList = JSON.parse(localStorage.getItem('taskDetails')) || [] ;

  let taskEntry = {
    Name: taskName.textContent,
    start:formatDateTime(startTime),
    stop: formatDateTime(stopTime),
    time: tasktime,
  };

  taskList.push(taskEntry);
  
  localStorage.setItem('taskDetails', JSON.stringify(taskList));
  console.log("log saved in to localStorage: " ,taskEntry);
  }

  function updatedTaskList()
  {  
     let taskList = JSON.parse(localStorage.getItem('taskDetails')) || [];
     let table = document.getElementById('TaskTableBody');
     table.innerHTML = '';

     for(let i= taskList.length - 1 ; i>= 0 ; i-- )  
      { 
      let task =taskList[i];
      let row = table.insertRow();
      let indexrow = row.insertCell(0);
      let taskname = row.insertCell(1);
      let start= row.insertCell(2);
      let stop = row.insertCell(3);
      let time = row.insertCell(4);
      let actionCell = row.insertCell(5);

      indexrow.textContent = taskList.length  - i;
      taskname.textContent = task.Name;
      start.textContent = task.start;
      stop.textContent = task.stop;
      time.textContent = task.time;

      let removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        
        removeButton.addEventListener('click', () => {
          removeLog(index); 
      });
      actionCell.appendChild(removeButton);
      }

}
      function removeLog(index) {
        taskList.splice(index, 1);
        localStorage.setItem('taskList', JSON.stringify(taskDetails))
        updatedTaskList();
      }
      updatedTaskList();
      
   

startButton.addEventListener("click", () => {
  var currentTask = inputTask.value;
  taskName.textContent = currentTask;
  if (!running) {
    startTime = getCurrentEpochTimeStamp();
    tInterval = setInterval(displayTimer, 500);
    inputTask.value = " ";
    document.getElementById("endClock").textContent = formatDateTime(startTime);
    running = true;
  }
});

function displayTimer() {
 let currentTime= getCurrentEpochTimeStamp();
 let elapsedTime = currentTime - startTime;
  startClock.textContent = formatTime(elapsedTime);
  
}

stopButton.addEventListener("click", () => {
  if (running) {
    stopTime = getCurrentEpochTimeStamp();
    clearInterval(tInterval);
    document.getElementById("endClock").textContent = " ";
    console.log(stopTime)
    difference = stopTime - startTime;
    let sec = Math.floor(difference / 1000);
    let min = Math.floor(sec / 60);
    let hour = Math.floor(min / 60);
    if (sec < 10) sec = "0" + sec;
    if (min < 10) min = "0" + min;
    tasktime = `${hour}:${min}:${sec}`;
    running = false;
    addTask();
    startClock.textContent = " ";
    taskName.textContent = " "
    let taskList = updatedTaskList();
    console.log('Retrieved Log Details:', taskList);
    updatedTaskList();
   }
  
   
  
  
  
});
