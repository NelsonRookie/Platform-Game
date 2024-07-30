const startBtn = document.getElementById('start-btn');
const canvas = document.getElementById('canvas');
const startScreen = document.querySelector('.start-screen');
const checkpointScreen = document.querySelector('.checkpoint-screen');
const checkpointMessage = document.querySelector('.checkpoint-screen > p');
const ctx = canvas.getContext("2d");
let isCheckpointCollisionDetectionActive = true;

canvas.width = innerWidth;
canvas.height = innerHeight;

// Use to make the character, platform and canvas are proportionate in different screen sizes
const proportionalSize = (size) => {
    return innerHeight < 500 ? Math.ceil((size / 500) * innerHeight) : size;
}

class Player {
    constructor() {
        this.position = {
            x: proportionalSize(10),
            y: proportionalSize(400)
        };
        this.velocity = {
            x: 0,
            y: 0
          };
        this.width = proportionalSize(40);
        this.height = proportionalSize(40);

    }
    // use to create the characters
    draw() {
        ctx.fillStyle = "#99c9ff" ;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    // ensure that character are continually drawn on the screen
    update() {
        this.draw();
        this.position += this.velocity.x;
        this.position.y += this.velocity.y;

        if(this.position.y + this.height + this.velocity.y <= canvas.height) {
            if(this.position.y < 0) {
                this.position.y = 0;
                this.velocity.y = gravity;
            }
            this.velocity.y = gravity;
        }else {
            this.velocity.y = 0;
        }

        if(this.position.y < this.width) {
            this.position.x = this.width
        }  

        if(this.position.x >= canvas.width - this.width * 2) {
            this.position.x = canvas.width - this.width * 2;
        }
    }
}

const player = new Player();
const startGame = () => {
    canvas.style.display = 'block';
    canvas.style.display = 'none';
    player.draw();
}

startBtn.addEventListener('click', startBtn);
const animate = () => {
    requestAnimationFrame(animate);

    //clear the canvas before the next animation
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
}