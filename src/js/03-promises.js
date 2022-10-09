import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const firstDelay = document.querySelector('input[name="delay"]');
const delayStep = document.querySelector('input[name="step"]');
const amountForm = document.querySelector('input[name="amount"]');
const createPromisesBtn = document.querySelector('button');
// console.log(form);
// console.log(firstDelay);
// console.log(delayStep);
// console.log(amountForm);
// console.log(createPromisesBtn);

form.addEventListener('submit', onCreatePromisesBtn);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//   });

function onCreatePromisesBtn(evt) {
  evt.preventDefault();
  let delay = Number(firstDelay.value);
  let step = Number(delayStep.value);
  let amount = Number(amountForm.value);
  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, delay + step * i)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
  evt.currentTarget.reset();
}
