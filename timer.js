
// new CountdownTimer({
//   selector: '#timer-1',
//   targetDate: new Date('Jul 17, 2019'),
// });

// /*
//  * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
//  * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
//  */
// const days = Math.floor(time / (1000 * 60 * 60 * 24));

// /*
//  * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
//  * остатка % и делим его на количество миллисекунд в одном часе
//  * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
//  */
// const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

// /*
//  * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
//  * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
//  */
// const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

// /*
//  * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
//  * миллисекунд в одной секунде (1000)
//  */
// const secs = Math.floor((time % (1000 * 60)) / 1000);
const refs = {
    startBtn: document.querySelector('button[data-action-start]'),
    stoptBtn: document.querySelector('button[data-action-stop]'),
    clockDisplay: document.querySelector('.js-clockDisplay'),
};


let intervalId = null;

function pad(value) {
    return String(value).padStart(2, '0');
}

function getTimeComponents(time) {
    const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)))
    const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

    return {days, hours, mins, secs};
    }

function getSetComponentsTime(d) {
   return d * 86400000 + Date.now();   
}

function timerStart() {
    refs.startBtn.setAttribute(`disabled`, true);
    refs.stoptBtn.removeAttribute(`disabled`);

    const startTime = getSetComponentsTime(1);
    
    intervalId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = startTime - currentTime;
        const {days, hours, mins, secs} = getTimeComponents(deltaTime);

        updateClockDisplay({days, hours, mins, secs});

    }, 1000);
};

function timerStop() {
    refs.stoptBtn.setAttribute(`disabled`, true);
    refs.startBtn.removeAttribute(`disabled`);
    refs.clockDisplay.textContent = '00::00::00::00';
    clearInterval(intervalId);
}

function updateClockDisplay({ days, hours, mins, secs }) {
    refs.clockDisplay.textContent = `${days}::${hours}::${mins}::${secs}`;
}

refs.startBtn.addEventListener('click', timerStart);
refs.stoptBtn.addEventListener('click', timerStop);

