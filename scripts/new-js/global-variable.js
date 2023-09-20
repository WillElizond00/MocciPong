// global-variable.js


// canvas
let canvasWidth = 800;
let canvasHeight = 400;

// Ball
let ball = new Ball(canvasWidth / 2, canvasHeight / 2, 10);

// Paddles
let playerPaddle = new Paddle(30, canvasHeight / 2 - 50, 10, 100);
let aiPaddle = new Paddle(canvasWidth - 40, canvasHeight / 2 - 50, 10, 100);

//scores
let playerScore = 0;
let aiScore = 0;


// Add a variable to keep track of which keys are currently being pressed
let keys = {};

// Add an event listener to track key presses
document.addEventListener('keydown', (event) => {
    keys[event.keyCode] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.keyCode] = false;
});
