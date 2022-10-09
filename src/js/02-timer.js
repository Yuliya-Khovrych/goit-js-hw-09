import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Ukrainian } from '../../node_modules/flatpickr/dist/l10n/uk';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const start = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
// console.log(input);
// console.log(start);
// console.log(days);
// console.log(hours);
// console.log(minutes);
// console.log(seconds);

start.disabled = true;

const options = {
  locale: Ukrainian,
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > new Date()) {
      start.disabled = false;
    } else {
      //window.alert('Please choose a date in the future');
      Notiflix.Notify.failure('Please choose a date in the future');
      start.disabled = true;
    }
  },
};

flatpickr(input, options);

const dataPickr = new flatpickr(input, options);
//console.log(dataPickr.selectedDates[0]);

start.addEventListener(`click`, onStart);
function onStart(evt) {
  const startTime = dataPickr.selectedDates[0];
  const timerId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = startTime - currentTime;
    if (deltaTime < 0) {
      clearInterval(timerId);
      return;
    }
    const time = convertMs(deltaTime);
    days.textContent = addLeadingZero(time.days);
    hours.textContent = addLeadingZero(time.hours);
    minutes.textContent = addLeadingZero(time.minutes);
    seconds.textContent = addLeadingZero(time.seconds);
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
