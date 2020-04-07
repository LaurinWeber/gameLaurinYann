export default class L_specials {

    constructor(game) {

        // get game boundaries
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        // get amount of hits on player paddle

        //define span object size
        this.size = 100;

        this.counter = 0;
        this.drawer = false;
        /*
        this.ballSizes = {
            1: 50,
            2: 40,
            3: 30,
            4: 20,
            5: 10
        };*/
        //total of 9 different positions
        this.spanPos = {x: 1 * this.gameWidth / 4, y: 1 * this.gameHeight / 4}; // first position in top left corner, (x*2, y*2) -> center.
        this.position = {x: 20, y:20};

    }

    /*
    spanPo() {
        this.speed = -this.maxSpeed;
    }

    spanSize() {
        this.speed = this.maxSpeed;
    }

    stop() {
        this.speed = 0;
    }
*/

    // after update
    draw(context) {
        if(this.drawer){
            context.fillStyle = "#ffffff"
            context.fillRect(this.position.x, this.position.y, this.size, this.size);
        }
    }

    //before draw
    update() {

        if(this.counter == 60){
            this.rand_X = (Math.floor(Math.random()*3)+1); //get random number between 1 -3
            this.rand_Y = (Math.floor(Math.random()*3)+1); //get random number between 1 -3

            this.position.x = this.rand_X * this.spanPos.x - this.size/2;
            this.position.y = this.rand_Y * this.spanPos.y - this.size/2;
            this.counter = 0;
            this.drawer =true;
        }
        else {
            this.counter++;
        }
    }
}