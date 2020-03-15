//Function 1
//For instance, if the tab isn’t active it will stop making calls until it becomes active again.
var animate = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) { window.setTimeout(callback, 1000/60) };

//canvas
var canvas = document.createElement('canvas');
var width = 400;
var height = 600;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

var player1 = new Player1();
var player2 = new Player2();
var ball = new Ball(200,300);

var timeleft = 30;
var ballColor = "black";


var xPaddle = 50;

window.onload = function() {
    document.body.appendChild(canvas);
    animate(step);
};

function step(){
    update();
    render();
    animate(step);
}

var update = function() {
    player1.update();
    player2.update();
    ball.update(player1.paddle, player2.paddle);
};

var render = function() {
    context.fillStyle = "#FF00FF";
    context.fillRect(0, 0, width, height);
    player1.render();
    player2.render();
    ball.render();
};

//Adding Paddle
function Paddle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
}

Paddle.prototype.render = function() {
    context.fillStyle = "#0000FF";
    context.fillRect(this.x, this.y, this.width, this.height);
};

//Player 1
function Player1() {
    this.paddle = new Paddle(175, 580, 50, 10);
}

Player1.prototype.render = function() {
    this.paddle.render();
};

//Player 2
function Player2() {
    this.paddle = new Paddle(175, 10, 50, 10);
}

Player2.prototype.render = function() {
    this.paddle.render();
};

//Add ball
function Ball(x,y){
    this.x = x;
    this.y = y;
    this.x_speed = 0;
    this.y_speed = 3;
    this.radius = 5;
}

Ball.prototype.render = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    context.fillStyle = "#000000";
    context.fill();
    if (timeleft < 25) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
        context.fillStyle = "#00FF00";
        context.fill();
        ballColor = "green";
    }
};

//Animating the ball
Ball.prototype.update = function() {
    this.x += this.x_speed;
    this.y += this.y_speed;
};

Ball.prototype.update = function(paddle1, paddle2) {
    this.x += this.x_speed;
    this.y += this.y_speed;
    var top_x = this.x - 5;
    var top_y = this.y - 5;
    var bottom_x = this.x + 5;
    var bottom_y = this.y + 5;

    if(this.x - 5 < 0) { // hitting the left wall
        this.x = 5;
        this.x_speed = -this.x_speed;
    } else if(this.x + 5 > 400) { // hitting the right wall
        this.x = 395;
        this.x_speed = -this.x_speed;
    }

    if(this.y < 0 || this.y > 600) { // a point was scored
        this.x_speed = 0;
        this.y_speed = 3;
        this.x = 200;
        this.y = 300;
    }

    if(top_y > 300) {
        if(top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
            // hit the player1's paddle
            this.y_speed = -3;
            this.x_speed += (paddle1.x_speed / 2);
            this.y += this.y_speed;
        }
    } else {
        if(top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
            // hit the player2's paddle
            this.y_speed = 3;
            this.x_speed += (paddle2.x_speed / 2);
            this.y += this.y_speed;
        }
    }
};

//Controls
var keysDown = {};

window.addEventListener("keydown", function(event) {
    keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
    delete keysDown[event.keyCode];
});

Paddle.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    this.x_speed = x;
    this.y_speed = y;
    if(this.x < 0) { // all the way to the left
        this.x = 0;
        this.x_speed = 0;
    } else if (this.x + this.width > 400) { // all the way to the right
        this.x = 400 - this.width;
        this.x_speed = 0;
    }
}

//Player 1 controls
Player1.prototype.update = function() {
    for(var key in keysDown) {
        var value = Number(key);
        if(value == 37) { // left arrow
            this.paddle.move(-4, 0);
        } else if (value == 39) { // right arrow
            this.paddle.move(4, 0);
        } else {
            this.paddle.move(0, 0);
        }
    }
};

//Player 2 controls
Player2.prototype.update = function() {
    for(var key in keysDown) {
        var value = Number(key);
        if(value == 65) { // left (a)
            this.paddle.move(-4, 0);
        } else if (value == 68) { // right (a)ddddda
            this.paddle.move(4, 0);
        } else {
            this.paddle.move(0, 0);
        }
    }
};

//Timer
var downloadTimer = setInterval(function(){
    timeleft -= 1;
}, 1000);

//Bonus 1 -- Ball green








