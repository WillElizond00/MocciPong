// Global Variables
var rounds = [5, 5, 3, 3, 2];

var colors = ['#1abc9c', '#2ecc71', '#8c52ff', '#9b59b6'] 

// ??
var DIRECTION = {
  IDLE: 0,
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4
};

// The ball object (The cube that bounces back and forth)
var Ball = {
  new: function (incrementedSpeed){
      return {
          width: 18,
          height: 18,
          x: (this.canvas.width / 2) - 9,
          y: (this.canvas.height / 2) - 9,
          moveX: DIRECTION.IDLE,
          moveY: DIRECTION.IDLE,
          speed: incrementedSpeed || 7
      };
  }
};

// The ai object(The two lines that move up and down)
var Ai = {
  new: function(side) {
      return {
          width: 18,
          height: 180,
          x: side === 'left' ? 150 : this.canvas.width -150,
          y:  (this.canvas.height / 2) - 35,
          score: 0,
          move: DIRECTION.IDLE,
          speed: 8
      };
  }
}  ;

var Game = {

  initialize: function(){
      this.canvas = document.querySelector('canvas');
      this.context = this.canvas.getContext('2d');

      this.canvas.width = 1400
this.canvas.height = 1000 

this.canvas.style.width = (this.canvas.width / 2) + 'px';
this.canvas.style.height = (this.canvas.height / 2) + 'px';


this.player = Ai.new.call(this, 'left');
this.ai = Ai.new.call(this, 'right');
this.ball = Ball.new.call(this);

this.ai.speed = 5;
this.running = this.over = false;
this.turn = turn.ai;
this.timer = this.round = 0;
this.color = '#8c52ff'

Pong.menu();
Pong.listen();

},


endGameMenu: function (text) {
// Change the canvas font size and color
  
Pong.context.font = '45px Courier New';
Pong.context.fillStyle = this.color;

//Draw the rectangle behind the ''Press any key begin' text 

Pong.context.fillRect(
  Pong.canvas.width / 2 - 350,
  Pong.canvas.height / 2 - 48,
  700,
  100
);

Pong.context.fillStyle = '#ffffff';

// Change the canvas color;
Pong.context.fillText(text,
  Pong.canvas.width / 2,
  Pong.canvas.height / 2 + 15
);

setTimeout(function (){
  Pong = Object.assign({}, Game);
  Pong.initialize();
}, 3000)
},

menu: function () {
  // Draw all the pong objects in their current state
  Pong.draw ();

  this.context.font = '50px Courier New';
  this.context.fillStyle = this.color;

  //Draw the rectangle behind the 'Press any key to begin' text.
  this.context.fillRect (
      this.canvas.width / 2 - 350,
      this.canvas.height /2 - 48,
      700,
      100
  );

  // Change the canvas color
  this.context.fillStyle = '#ffffff';

// Draw the 'press any key begin' text
this.context.fillText('Press any key to begin',
this.canvas.width / 2,
this.canvas.height / 2 + 15

)
},
//Update all objects (move the player, ai, ball , increment the score, etc.)
update: function () {
  if (!this.over) {
      // If the ball collides with the bound limits - correct the x and y coords.
      if (this.ball.x <= 0) Pong._resetTurn.call(this, this.ai, this.player);
      if (this.ball.x >= this.canvas.width - this.ball.width) Pong._resetTurn.call(this, this.player, this.ai);

      if(this.ball.y <= 0) this.ball.moveY = DIRECTION.DOWN;
      if(this.ball.y >= this.canvas.height - this.ball.height) this.ball.moveY = DIRECTION.UP; 
  
  // Move player if they player.move value was updated by a keyboard event
  if (this.player.move == DIRECTION.UP) this.player.y -= this.player.speed;
  else if (this.player.move === DIRECTION.DOWN) this.player.y += this.player.speed;
  }

//On new serve (start of each turn) move the ball to the correct side
// and randomize the direction to add some challenge.

if (Pong._turnDelayIsOver.call(this) && this.turn) {
  this.ball.moveX = this.turn === this.player ? DIRECTION.LEFT : DIRECTION.RIGHT;
 this.ball.moveY = [DIRECTION.UP, DIRECTION.DOWN][Math.round(Math.random())];
 this.ball.y = Math.floor(Math.random() * this.canvas.height - 200) + 200;
 this.turn = null; 

}

if (this.player.y <= 0) this.player.y = 0;
else if (this.player.y >= (this.canvas.height - this.player.height )) this.player.y = (this.
  canvas.height - this.player.height);

//Move ball in intended direction based on moveY and moveX values
if (this.ball.moveY === DIRECTION.UP) this.ball.y -= (this.ball.speed / 1.5);
else if (this.ball.moveY === DIRECTION.DOWN) this.ball.y += (this.ball.speed / 1.5)
if(this.ball.moveX === DIRECTION.LEFT) this.ball.x -= this.ball.speed;
else if (this.ball.moveX === DIRECTION.RIGHT) this.ball.x += this.ball.speed;

// Handle ai (AI) UP and DOWN movement
if (this.ai.y > this.ball.y - (this.ai.height / 2)){
  if(this.ball.moveX === DIRECTION.RIGHT) this.ai.y -= this.ai.speed / 1.5;
  else this.ai.y -= this.ai.speed / 4;
}
if (this.ai.y > this.ball.y - (this.ai.height / 2)){
  if(this.ball.moveX === DIRECTION.RIGHT) this.ai.y += this.ai.speed / 1.5;
  else this.ai.y -= this.ai.speed / 4;
}


// Handle ai (AI) wall collision
if (this.ai.y >= this.canvas.height - this.ai.height) this.ai.y = this.canvas.height - this.ai.height;
else if (this.ai.y <= 0) this.ai.y = 0;

// Handle Player-Ball collisions 
if(this.ball.x - this.ball.width <= this.player.x && this.ball.x >= this.player.x - this.player.width){
if (this.ball.y <= this.player.y + this.player.height && this.ball.y + this.ball.
  height >= this.player.y) {
      this.ball.x = (this.player.x + this.ball.width)
      this.ball.moveX = DIRECTION.RIGHT;
  }
  }

  // Handle ai-ball collision 
if (this.ball.x - this.ball.width <= this.ai.x && this.ball.x >= this.ai.x - this.ai.width){
  if (this.ball.y <= this.ai.y + this.ai.height && this.ball.y + this.ball.height >=
      this.ai.y){
          this.ball.x = (this.aix - this.ball.width);
          this.ball.moveX = DIRECTION.LEFT; 
      }
}
  }