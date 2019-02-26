let playing = false;
var timer = document.getElementById('timer').innerHTML;
let score = document.getElementById('scoreValue').innerHTML;
score = parseInt(score);

/**check if we are playing or not */
function checkPlay(play) {
    if (play == true) {
        window.location.reload();
    } else {
        playing = true;
        console.log('We are  playing');
        document.getElementById('score').style.display = 'block';
        document.getElementById('timeRemaining').style.visibility = 'visible';
        document.getElementById('instruction').innerHTML = 'click on the correct answer';
        document.getElementById('start').innerHTML = 'Reset';
    }
}

/**Generate number */
function randomNumber(level = 11) {
    return Math.round(Math.random() * level);
}

/**Generate question and answer */
function question() {
    let x = randomNumber();
    let y = randomNumber();
    let solution = x * y;
    document.getElementById('question').innerHTML = x + '*' + y;
    for (let i = 1; i < 5; i++) {
        document.getElementById('solution' + i).innerHTML = randomNumber(101);
    }
    let aleatoireSolution = Math.floor(Math.random() * 4) + 1;
    document.getElementById('solution' + aleatoireSolution).innerHTML = solution;
    return solution;
}

/** checkanswer */
function checkAnswer(choose, solution) {
    if (choose == solution) {
        document.getElementById('correct').style.display = 'block';
        setTimeout(function () {
            document.getElementById('correct').style.display = 'none';
        }, 2000);
        score += 1;
        document.getElementById('scoreValue').innerHTML = score;
    } else {
        document.getElementById('wrong').style.display = 'block';
        setTimeout(function () {
            document.getElementById('wrong').style.display = 'none';
        }, 2000);;
    }
}

/**play the game */
document.getElementById('start').onclick = function () {
    checkPlay(playing);

    /**set time of the game */
    var setTimer = setInterval(function () {
        timer--;
        if (timer <= 0) {
            clearInterval(setTimer);
            document.getElementById('gameOver').innerHTML += '<h3 style="text-align:center;">score: '+score+'</h3>';
            document.getElementById('gameOver').style.display = 'block';
            document.getElementById('start').innerHTML = 'Start Game';
        }
        document.getElementById('timer').innerHTML = timer;
    }, 1000);


    let solution = question();

    for (let i = 1; i < 5; i++) {
        document.getElementById('solution' + i).onclick = function () {
            checkAnswer(document.getElementById('solution' + i).innerHTML, solution);
            this.style.backgroundColor = "rgba(202, 198, 198,.7)";
            setTimeout(function () {
                document.getElementById('solution' + i).style.backgroundColor = "gray";
            }, 2000);
            solution = question();
        };
    }

};

