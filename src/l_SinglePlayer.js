import L_gameSinglePlayer from "./l_gameSinglePlayer";
// constnats
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

// global variables, throughout the program
var scorePlayer = 0;
var scoreAI = 0;
var is_playing = flase;

// local variable, only within this class
// why no main_canvas & background_canvas??
let main_canvas;
let main_context;
let background_canvas;
let background_ctx;
let game // create instance of SinglePlayerGame
//??
let lastTime = 0;
let requestaframe;

init();

function init(){
    // background_canvas = document.getElementById('background_canvas');
    // background_ctx = main_canvas.getContext('2d');

    main_canvas = document.getElementById("main_canvas");
    main_context = main_canvas.getContext('2d');

    // browserdetails to set the amount of pictures per sec. (default 60 per 1sec.)
    requestaframe = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60)
            };
    })();

    game = new SinglePlayer(GAME_WIDTH,GAME_HEIGHT);
    game.create(); //create the game
}

// get mouseEvent, from mouse hover to display the coordinates!
function mouse(e) {
    var x = e.pageX - document.getElementById('game_object').offsetLeft;
    var y = e.pageY - document.getElementById('game_object').offsetTop;
    document.getElementById('x').innerHTML = x;
    document.getElementById('y').innerHTML = y;
}

function gameLoop(timestamp){

    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    main_context.clearRect(0,0,800,600);

    game.update(deltaTime);
    game.draw(main_context);

    if(is_playing)
    requestaframe(gameLoop);
}

function start_loop() {
    is_playing = true;
    gameLoop();
}

function stop_loop() {
    is_playing = false;
}

