let countdown;

const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");
const custom = document.querySelector("#custom");

const timer = seconds => {
  // Clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + 1000 * seconds;

  displayTimeLeft(seconds);
  displayEndTime(then);

  // console.log( { now, then } );
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // Check if to dispaly it
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // Display it
    displayTimeLeft(secondsLeft);
  }, 1000);
};

displayTimeLeft = seconds => {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
  timerDisplay.textContent = display;
  document.title = display;
  console.log({ minutes, remainderSeconds });
};

displayEndTime = timestamp => {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${hour}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
};

const startTimer = event => {
  const seconds = parseInt(event.currentTarget.dataset.time);
  console.log(seconds);
  timer(seconds);
};

buttons.forEach(button => button.addEventListener("click", startTimer));

custom.addEventListener("submit", event => {
  event.preventDefault();
  const el = event.currentTarget;
  const mins = el.querySelector('[name="minutes"]').value;
  console.log(mins * 60);
  timer(mins * 60);
  el.reset();
});
