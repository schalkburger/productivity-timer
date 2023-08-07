// Values for the time
const focusTime = 25;
const shortBreakTime = 5;
const longBreakTime = 15;

// Timer element
const timerElement = document.getElementById("timerPosition");
let interval;
let currentTimerType = null;

// Texts for timer completion
const timeUpText = "Your time is up!";
const focusTimeUpText = "Your focus time is up. Take a break.";
const shortBreakOverText = "Your short break is over.";
const longBreakOverText = "Your long break is over.";

// Function to update document title
function updateDocumentTitle(minutes, seconds) {
  document.title = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// Function to start the timer
function startTimer(minutes, seconds, completionText) {
  clearInterval(interval); // Clear any existing interval
  currentTimerType = completionText;
  let totalSeconds = minutes * 60 + seconds;
  updateDocumentTitle(minutes, seconds); // Update document title with initial countdown
  interval = setInterval(() => {
    const minutesLeft = Math.floor(totalSeconds / 60);
    const secondsLeft = totalSeconds % 60;

    timerElement.textContent = `${minutesLeft.toString().padStart(2, "0")}:${secondsLeft.toString().padStart(2, "0")}`;
    updateDocumentTitle(minutesLeft, secondsLeft); // Update document title with countdown

    if (totalSeconds <= 0) {
      clearInterval(interval);
      updateDocumentTitle(0, 0); // Reset document title to display completion text
      // You can add additional actions here when the timer reaches zero
    }

    totalSeconds--;
  }, 1000);
}

// Event listeners for buttons
document.getElementById("focusButton").addEventListener("click", () => {
  startTimer(focusTime, 0, focusTimeUpText);
});

document.getElementById("shortBreakButton").addEventListener("click", () => {
  startTimer(shortBreakTime, 0, shortBreakOverText);
});

document.getElementById("longBreakButton").addEventListener("click", () => {
  startTimer(longBreakTime, 0, longBreakOverText);
});

document.getElementById("timerReset").addEventListener("click", () => {
  clearInterval(interval); // Clear the interval to stop the timer
  currentTimerType = null;
  updateDocumentTitle(0, 0); // Reset document title
  timerElement.textContent = "25:00";
});

// Additional styling or features can be added as needed

// Sound functions

const sound = document.getElementById("buzzersound");
/* Make sure our sound will not autoplay or loop */
sound.autoplay = false;
sound.loop = false;
// Play sound when timer is finished
function finish() {
  /* Play the buzzer sound */
  sound.play();
}
