const clockSection = document.getElementById("clock");
const stopwatchSection = document.getElementById("stopwatch");
const timerSection = document.getElementById("timer");

// Button
const btnClock = document.getElementById("btn-clock");
const btnStopwatch = document.getElementById("btn-stopwatch");
const btnTimer = document.getElementById("btn-timer");


// stopwatch
let stopwatchInterval;
let elapsedSeconds = 0;
document.getElementById("start").addEventListener("click", startStopwatch);
document.getElementById("stop").addEventListener("click", stopStopwatch);
document.getElementById("reset").addEventListener("click", resetStopwatch);



function showsection(sectionToshow) {
    clockSection.classList.add("hidden");
    stopwatchSection.classList.add("hidden");
    timerSection.classList.add("hidden");

    sectionToshow.classList.remove("hidden")
}

btnClock.addEventListener("click", () => {
    showsection(clockSection);
});

btnStopwatch.addEventListener("click", () => {
    showsection(stopwatchSection);
});

btnTimer.addEventListener("click", () => {
    showsection(timerSection);
});

let is24Hour = true;

const toggleFormatBtn = document.getElementById("toggle-format");
const clockTime = document.getElementById("clock-time");

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    let display = "";

    if (is24Hour) {
        display = `${String(hours).padStart(2, '0')}:${minutes}:${seconds}`;
    } else {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // 0 -> 12
        display = `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
    }

    clockTime.textContent = display;
}

setInterval(updateClock, 1000);
updateClock(); // call once immediately

toggleFormatBtn.addEventListener("click", () => {
    is24Hour = !is24Hour;
    toggleFormatBtn.textContent = is24Hour ? "Switch to 12-Hour" : "Switch to 24-Hour";
    updateClock(); // refresh display instantly
});


function formatTime(seconds) {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
}


function startStopwatch() {
    if (!stopwatchInterval) {
        stopwatchInterval = setInterval(() => {
            elapsedSeconds++;
            document.getElementById("stopwatch-time").textContent = formatTime(elapsedSeconds);
        }, 1000);
    }
}

function stopStopwatch() {
    clearInterval(stopwatchInter-val);
    stopwatchInterval = null;
}
 
function resetStopwatch() {
    stopStopwatch();
    elapsedSeconds = 0;
    document.getElementById("stopwatch-time").textContent = "00:00:00";
}


//  For Timer

let timerInterval;
let timerTime = 0;

const timerInput = document.getElementById("timer-input")
const timerdisplay = document.getElementById("timer-display")

document.getElementById("timer-start").addEventListener("click", timerStart);
document.getElementById("timer-reset").addEventListener("click", timerReset);

function updateTimerDisplay() {
    const mins = String(Math.floor(timerTime / 60)).padStart(2, '0');
    const secs = String(timerTime % 60).padStart(2, '0');
    timerdisplay.textContent = `${mins}:${secs}`;
}

function timerStart() {
    if (timerInterval) return;

    const inputSeconds = parseInt(timerInput.value);
    if (isNaN(inputSeconds) || inputSeconds <= 0) {
        alert("Please enter a valid time in seconds");
        return;
    }

    timerTime = inputSeconds;
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        timerTime--;
        updateTimerDisplay();

        if (timerTime <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("Time's up!");
        }
    }, 1000);
}

function timerReset() {
    clearInterval(timerInterval);
    timerInterval = null;
    timerTime = 0;
    updateTimerDisplay();
    timerInput.value = "";
}