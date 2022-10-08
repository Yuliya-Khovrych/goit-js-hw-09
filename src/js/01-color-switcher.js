const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');
console.log(start);
console.log(stop);

let timerId = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

start.addEventListener('click', onStart);
start.addEventListener('click', onStop);

function onStart(evt) {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    start.setAttribute('disabled', 'disabled');
    stop.removeAttribute('disabled');
  }, 1000);
}

function onStop(evt) {
  clearInterval(timerId);
  start.removeAttribute('disabled');
  stop.setAttribute('disabled', 'disabled');
}
