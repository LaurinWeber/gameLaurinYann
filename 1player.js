//Function 1
//For instance, if the tab isn’t active it will stop making calls until it becomes active again.
var animation = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) { window.setTimeout(callback, 1000/60) };

//Canvas
var canvas = document.createElement('canvas');
var width = 400;
var height = 600;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

//Page first load
//attach the canvas to the screen
window.onload = function() {
    document.body.appendChild(canvas);
    animation(initiate);
};

//update all of our objects
//render those objects
var initiate = function() {
    update();
    render();
    animation(initiate);
};

var update = function() {
};

var render = function() {
    context.fillStyle = "#FF00FF"; //BackgroundColor
    context.fillRect(0, 0, width, height); //Fill the rectangle
};


//Adding object to the canvas -- Raket
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

function Player() {
    this.raket = new Paddle(175, 580, 50, 10);
}

function Computer() {
    this.paddle = new Paddle(175, 10, 50, 10);
}

Player.prototype.render = function() {
    this.raket.render();
};

Computer.prototype.render = function() {
    this.paddle.render();
};

//Adding object to the canvas -- Ball
function Ball(x, y) {
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
};

//Build the objects
var player = new Player();
var computer = new Computer();
var ball = new Ball(200, 300);

var render = function() {
    context.fillStyle = "#FF00FF";
    context.fillRect(0, 0, width, height);
    player.render();
    computer.render();
    ball.render();
};

//Animating the ball
var update = function() {
    ball.update();
};

Ball.prototype.update = function() {
    this.x += this.x_speed;
    this.y += this.y_speed;
};

//Making the ball bounce on paddles
var update = function() {
    ball.update(player.raket, computer.paddle);
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
            // hit the player1's raket
            this.y_speed = -3;
            this.x_speed += (paddle1.x_speed / 2);
            this.y += this.y_speed;
        }
    } else {
        if(top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
            // hit the Player1's raket
            this.y_speed = 3;
            this.x_speed += (paddle2.x_speed / 2);
            this.y += this.y_speed;
        }
    }
};

var keysDown = {};
//Controls -- Player (Controls with <- and ->)
window.addEventListener("keydown", function(event) {
    keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
    delete keysDown[event.keyCode];
});

var update = function() {
    player.update();
    ball.update(player.raket, computer.paddle);
};

Player.prototype.update = function() {
    for(var key in keysDown) {
        var value = Number(key);
        if(value == 37) { // left arrow
            this.raket.move(-4, 0);
        } else if (value == 39) { // right arrow
            this.raket.move(4, 0);
        } else {
            this.raket.move(0, 0);
        }
    }
};

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

//Computer
var update = function() {
    player.update();
    computer.update(ball);
    ball.update(player.raket, computer.paddle);
};

Computer.prototype.update = function(ball) {
    var x_pos = ball.x;
    var diff = -((this.paddle.x + (this.paddle.width / 2)) - x_pos);
    if(diff < 0 && diff < -4) { // max speed left
        diff = -5;
    } else if(diff > 0 && diff > 4) { // max speed right
        diff = 5;
    }
    this.paddle.move(diff, 0);
    if(this.paddle.x < 0) {
        this.paddle.x = 0;
    } else if (this.paddle.x + this.paddle.width > 400) {
        this.paddle.x = 400 - this.paddle.width;
    }
};

function changeBacllColor() {

}

