// ball.js

class Ball {
  constructor(x, y, radius) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.dx = 2; // Initial horizontal velocity
      this.dy = 2; // Initial vertical velocity
  }

  update() {
  
    // Update ball position
    this.x += this.dx;
    this.y += this.dy;

    // Collisions with walls
    if (this.y - this.radius < 0 || this.y + this.radius > canvasHeight) {
        this.dy = -this.dy;
    }

    // Collisions with player paddle
    if (
        this.x - this.radius < playerPaddle.x + playerPaddle.width &&
        this.y > playerPaddle.y &&
        this.y < playerPaddle.y + playerPaddle.height
    ) {
        this.dx = -this.dx; // Reverse horizontal direction
    }

    // Collisions with AI paddle
    if (
        this.x + this.radius > aiPaddle.x &&
        this.y > aiPaddle.y &&
        this.y < aiPaddle.y + aiPaddle.height
    ) {
        this.dx = -this.dx; // Reverse horizontal direction
    }
  }


  draw() {
      // Draw the ball on the canvas
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'black';
      ctx.fill();
      ctx.closePath();
  }

  reset() {
    this.x = canvasWidth / 2;
    this.y = canvasHeight / 2;
    this.dx = -this.dx; // Change direction
    this.dy = Math.random() > 0.5 ? Math.random() * 3 : -Math.random() * 3; // Reset random velocity
  }

  // Add update and draw methods for the ball
  
}