import Menu from "./menu.js";

// constnats
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

// global variables, throughout the program
var is_playing = true;

// local variable, only within this class
// why no main_canvas & background_canvas??
let main_canvas;
let main_context;

let menu // create instance of SinglePlayerGame
var requestaframe;

init();
gameLoop();

function init() {
    main_canvas = document.getElementById("main_canvas");
    main_context = main_canvas.getContext('2d');

    document.getElementById("main_canvas").addEventListener("mousemove", mouse);
    document.getElementById("main_canvas").addEventListener("click", click);

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

    menu = new Menu(GAME_WIDTH, GAME_HEIGHT);
    menu.create(main_context); //create the game
}

function mouse(e) {
    var x = e.pageX - document.getElementById('main_canvas').offsetLeft;
    var y = e.pageY - document.getElementById('main_canvas').offsetTop;
    menu.mouse(x,y);
}

function click(e) {
    var x = e.pageX - document.getElementById('main_canvas').offsetLeft;
    var y = e.pageY - document.getElementById('main_canvas').offsetTop;
    menu.mouseClick(x,y);
}

function gameLoop() {

    main_context.clearRect(0, 0, 800, 600);

    menu.update();
    menu.draw(main_context);

    if (is_playing) {
        requestaframe(gameLoop);
    }
}




