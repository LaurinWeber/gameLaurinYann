import Game from "./game.js"

// why no main_canvas & background_canvas??
let canvas = document.getElementById("gameScreen");
let context = canvas.getContext('2d');

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let game = new Game(GAME_WIDTH,GAME_HEIGHT);

game.start(); //??

//??
var scorePlayer = 0;
var scoreAI = 0;

//??
let lastTime = 0;

function gameLoop(timestamp){

    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    context.clearRect(0,0,800,600);
    game.update(deltaTime);
    game.draw(context);

    requestAnimationFrame(gameLoop);
}

