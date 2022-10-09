const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');
// console.log(start);
// console.log(stop);

let timerId = null;
stop.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

start.addEventListener('click', onStart);
stop.addEventListener('click', onStop);

function onStart(evt) {
  start.disabled = true;
  stop.disabled = false;
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStop(evt) {
  start.disabled = false;
  stop.disabled = true;
  clearInterval(timerId);
}
