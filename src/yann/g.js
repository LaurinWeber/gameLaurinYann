var version = '0.0.3';

main_canvas = document.getElementById('main_canvas');
main_ctx = main_canvas.getContext('2d');

function init() {
    // define background and foreground canvas
    //background_canvas = document.getElementById('background_canvas');
    //background_ctx = main_canvas.getContext('2d');


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
    //create a new player instance
}