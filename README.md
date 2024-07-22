# Time Tracking App

This is a Timetracking App build using HTML ,CSS AND JAVASCRIPT.Please follow the instruciotns to set it up.

**Features**

1. Two different modes Timer and Manual
2. TrackTime using Timer start and stop option
3. TrackTime by manualy entering ur past jobs and time 
4. Table that displays the history of all the logged tasks
5. Analytics chart for past one week. That Shows the time Spent on each day

[WorkingDemo]

### Instructions

1.Clone the repo and run ``npm install``
2.From the QuickTrack folder run ``npm run dev``


---

**Formating Epoch Time into hh:min | day month year**
```js
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

```
**Formating Epoch Time into hh:min:seconds **
```js
function formatTime(epochTime){
  let seconds = Math.floor((epochTime/1000) % 60) ;
  let minutes =  Math.floor((epochTime/ (1000 * 60 )) % 60) ;
  let hours=  Math.floor((epochTime/ (1000 * 60 * 60 )) % 24) ;
  hours = hours < 10 ? '0'+ hours : hours;
  minutes = minutes < 10 ? '0'+ minutes : minutes;
  seconds = seconds < 10 ? '0'+ seconds : seconds;
  
  return `${hours}:${minutes}:${seconds}`;
  
}
```


