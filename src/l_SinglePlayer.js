import L_gameSinglePlayer from "./l_gameSinglePlayer.js";

// constnats
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

// global variables, throughout the program
var is_playing = true;

// local variable, only within this class
// why no main_canvas & background_canvas??
let main_canvas;
let main_context;
let background_canvas;
let background_ctx;
let game // create instance of SinglePlayerGame
var requestaframe;

init();
gameLoop();

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

    game = new L_gameSinglePlayer(GAME_WIDTH,GAME_HEIGHT);
    game.create(); //create the game
}

// get mouseEvent, from mouse hover to display the coordinates!
function mouse(e) {
    var x = e.pageX - document.getElementById('game_object').offsetLeft;
    var y = e.pageY - document.getElementById('game_object').offsetTop;
    document.getElementById('x').innerHTML = x;
    document.getElementById('y').innerHTML = y;
}

function gameLoop(){

    main_context.clearRect(0,0,800,600);

    game.update();
    game.draw(main_context);

    if(is_playing){
        requestaframe(gameLoop);
    }
}




