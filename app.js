let start = document.querySelector('.start');
let h2 = document.querySelector('h2');
let gameSeq = [];
let userSeq = [];
let btns = ['yellow', 'red', 'blue', 'green'];
let started = false;
let level = 0;

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    btnFlash(randBtn);
}

function btnFlash(btn) {
    btn.style.opacity = '1';
    setTimeout(() => {
        btn.style.opacity = '0.15';
    }, 350);
}

function btnPress(event) {
    let btnn = event.currentTarget;
    btnFlash(btnn);
    let userColor = btnn.getAttribute('id');
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

function checkAns(idx) {
    if (gameSeq[idx] === userSeq[idx]) {
        if (gameSeq.length === userSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score is <b>${level}</b>`;
        document.querySelector('body').style.background = 'red';
        setTimeout(function(){
            document.querySelector('body').style.background = '#A9A9A9';
        },2000);
        setTimeout(reset,2000);
    }
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    h2.innerText = 'Press the START button to start again';
}

start.addEventListener('click', () => {
    if (!started) {
        started = true;
        levelUp();

        let allBtns = document.querySelectorAll('.btn');
        for (let btn of allBtns) {
            btn.addEventListener('click', btnPress);
        }
    }
});
