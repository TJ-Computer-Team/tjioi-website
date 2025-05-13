let bar = document.querySelector("#hero #timer svg circle:nth-of-type(2)");
let timer = document.querySelector("#hero #timer");
const txt = document.querySelector("#hero #timer p");

const setPercent = (val) => {
  const len = Math.floor(2*Math.PI*timer.clientWidth*0.4);
  bar.style.strokeDasharray = len;
  bar.style.strokeDashoffset = Math.floor(len*(1-val));
}

const getTime = (diff) => {
  const hours = Math.floor(diff/(1000*60*60)); diff %= 1000*60*60;
  const minutes = Math.floor(diff/(1000*60)); diff %= 1000*60;
  const seconds = Math.floor(diff/(1000));

  return {hours, minutes, seconds};
}

const timerLoop = () => {
  const now = new Date();
  const contestStart = new Date('2024-05-11T12:30:00.000Z')
  const contestEnd = new Date('2024-05-11T15:30:00.000Z')
  
  let diff = 0, maxDiff = 0, update = true;
  if(contestStart - now > 0){
    diff = contestStart-now;
    maxDiff = 1000*60*60*24*3;

    const {hours, minutes, seconds} = getTime(diff);
    txt.innerHTML = `Contest starts in <br>${hours} hrs ${minutes}m ${seconds}s`;
  } else if(contestEnd - now > 0){
    diff = contestEnd-now;
    maxDiff = 1000*60*60*3;

    const {hours, minutes, seconds} = getTime(diff);
    txt.innerHTML = `Contest ends in <br>${hours}hrs ${minutes}m ${seconds}s`;
  } else {
    setPercent(1.0);
    update = false;
    txt.innerHTML = `Contest has finished!<br><br><a href="./static/images/TJIOI_2024_Standings.jpg">Final In-Person Standings</a><br><a href="./static/contest/TJIOI_2024_Problemset.pdf">Problems</a><br><a href="https://codeforces.com/blog/entry/129435">Editorial/Solutions</a>`;
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