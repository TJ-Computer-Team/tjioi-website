let bar = document.querySelector("#hero #timer svg circle:nth-of-type(2)");
let timer = document.querySelector("#hero #timer");
const txt = document.querySelector("#hero #timer p");

const setPercent = (val) => {
    const len = Math.floor(2*Math.PI*timer.clientWidth*0.4);
    bar.style.strokeDasharray = len;
    bar.style.strokeDashoffset = Math.floor(len*(1-val));
}

const getTime = (diff) => {
    const days = Math.floor(diff / (1000*60*60*24));
    diff %= 1000*60*60*24;

    const hours     = Math.floor(diff / (1000*60*60));
    diff %= 1000*60*60;

    const minutes = Math.floor(diff / (1000*60));
    diff %= 1000*60;

    const seconds = Math.floor(diff / 1000);

    return { days, hours, minutes, seconds };
}

const timerLoop = () => {
    const now = new Date();
    const registrationEnd = new Date('2026-04-20T23:59:59.000Z');
    const contestStart = new Date('2026-05-02T13:30:00.000Z');
    const contestEnd = new Date('2026-05-02T20:00:00.000Z');

    let diff = 0, maxDiff = 0, update = true;
    if(registrationEnd - now > 0) {
        diff = registrationEnd-now;
        const {days, hours, minutes, seconds} = getTime(diff);
        txt.innerHTML = `
        Registration closes in<br>
        <span class="unit days">${days} days</span><br>
        <span class="unit">${hours} h</span>
        <span class="unit">${minutes} m</span>
        <span class="unit">${seconds} s</span>`;
        maxDiff = new Date('2026-04-01T00:00:00.000Z') - registrationEnd;
    }
    else if(contestStart - now > 0){
        diff = contestStart-now;
        maxDiff = 1000*60*60*24*3;

        const {days, hours, minutes, seconds} = getTime(diff);
        txt.innerHTML = `
        Contest starts in<br>
        <span class="unit days">${days} days</span><br>
        <span class="unit">${hours} h</span>
        <span class="unit">${minutes} m</span>
        <span class="unit">${seconds} s</span>`;

    } else if(contestEnd - now > 0){
        diff = contestEnd-now;
        maxDiff = 1000*60*60*3;

        const {hours, minutes, seconds} = getTime(diff);
        txt.innerHTML = `Contest ends in <br>${hours}hrs ${minutes}m ${seconds}s`;
    } else {
        setPercent(1.0);
        update = false;
        txt.innerHTML = `Contest has finished!`;
    }

    if(update){
        setPercent((maxDiff-diff)/maxDiff)
        setTimeout(timerLoop, 1000);
    }
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visited');
        }
    });
}, {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
});

const elements = document.querySelectorAll('.panel, .fade-up')
elements.forEach(el => observer.observe(el))

timerLoop()

const toTop = document.getElementById('toTop');
const container = document.querySelector('main');    // ← scroll happens here

container.addEventListener('scroll', () => {
    toTop.style.display = container.scrollTop > 300 ? 'flex' : 'none';
});

toTop.addEventListener('click', () => {
    container.scrollTo({ top: 0, behavior: 'smooth' });
});
