// Values for the time
const focusTime = 25;
const shortBreakTime = 5;
const longBreakTime = 15;

// Timer element
const timerElement = document.getElementById("timerContainer");
let interval;
let currentTimerType = null;

// Texts for timer completion
const timeUpText = "Your time is up!";
const focusTimeUpText = "Your focus time is up. Take a break.";
const shortBreakOverText = "Your short break is over.";
const longBreakOverText = "Your long break is over.";

// Sound functions
const soundTimer = document.getElementById("timerSound");
soundTimer.autoplay = false;
soundTimer.loop = false;

function playSoundTimer() {
  soundTimer.currentTime = 0; // Reset the audio to the beginning
  soundTimer.play();
}

const soundTicking = document.getElementById("tickingSound");
soundTicking.autoplay = false;
soundTicking.loop = false;

function playSoundTicking() {
  soundTicking.currentTime = 0; // Reset the audio to the beginning
  soundTicking.play();
}

// Function to update document title
function updateDocumentTitle(minutes, seconds) {
  if (minutes !== undefined && seconds !== undefined) {
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");
    document.title = `${formattedMinutes}:${formattedSeconds}`;
  } else {
    document.title = currentTimerType;
  }
}

// Function to start the timer
function startTimer(minutes, seconds, completionText) {
  clearInterval(interval); // Clear any existing interval
  currentTimerType = completionText;
  let totalSeconds = minutes * 60 + seconds;
  updateDocumentTitle(minutes, seconds);
  interval = setInterval(() => {
    const minutesLeft = Math.floor(totalSeconds / 60);
    const secondsLeft = totalSeconds % 60;

    timerElement.textContent = `${minutesLeft.toString().padStart(2, "0")}:${secondsLeft.toString().padStart(2, "0")}`;
    updateDocumentTitle(minutesLeft, secondsLeft);

    playSoundTicking();

    if (totalSeconds <= 0) {
      clearInterval(interval);
      updateDocumentTitle(currentTimerType); // Update document title with completion text
      playSoundTimer(); // Play soundTimer when timer is finished
      // Additional actions here when the timer reaches zero
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
  currentTimerType = "Productivity Timer";
  updateDocumentTitle("Productivity Timer"); // Set title to "Productivity Timer"
  timerElement.textContent = "25:00";
});
