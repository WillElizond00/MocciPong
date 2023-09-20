// game.js

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = canvasWidth;
canvas.height = canvasHeight;

let goalHighlightFrames = 0; // Add this variable

function gameLoop() {
  ball.update();
  playerPaddle.update();
  aiPaddle.update();

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  ball.draw();
  playerPaddle.draw();
  aiPaddle.draw();

  requestAnimationFrame(gameLoop);

  // Check if ball goes out of bounds (scoring)
  if (ball.x < 0) {
      aiScore++;
      ball.reset(); // Assuming you have a reset method for the ball
      goalHighlightFrames = 30; // Highlight the goal for 30 frames
  } else if (ball.x > canvasWidth) {
      playerScore++;
      ball.reset(); // Assuming you have a reset method for the ball
      goalHighlightFrames = 30; // Highlight the goal for 30 frames
  }


  // Draw goal outline
  ctx.strokeStyle = 'rgba(255, 255, 255, 255)';
  ctx.lineWidth = 2;

  // Left Goal
  ctx.strokeRect(0, 0, 20, canvasHeight);

  // Right Goal
  ctx.strokeRect((canvasWidth - 20), 0, 20, canvasHeight);

  

  // Move player paddle
  if (keys[38] && playerPaddle.y - playerPaddle.dy >= 0) {
      playerPaddle.y -= playerPaddle.dy;
  }
  if (keys[40] && playerPaddle.y + playerPaddle.dy + playerPaddle.height <= canvasHeight) {
      playerPaddle.y += playerPaddle.dy;
  }

  // Basic AI logic with proportional control
  if (ball.x > canvasWidth / 2) {
    let targetY = ball.y - aiPaddle.height / 2;
    let error = targetY - aiPaddle.y;
    aiPaddle.y += error * 0.1; // Adjust the factor for responsiveness
  }

  // Draw goal highlight
  if (goalHighlightFrames > 0) {
    ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
    ctx.fillRect((canvasWidth - 20), 0, 20, canvasHeight); // Highlight the goal area
    goalHighlightFrames--;
  }



  // Display scores
  ctx.font = "30px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(playerScore, 50, 50);
  ctx.fillText(aiScore, canvasWidth - 80, 50);
}

gameLoop();

document.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
        case 38: // Up arrow key
            if (playerPaddle.y - playerPaddle.dy >= 0) {
                playerPaddle.y -= playerPaddle.dy;
            }
            break;
        case 40: // Down arrow key
            if (playerPaddle.y + playerPaddle.dy + playerPaddle.height <= canvasHeight) {
                playerPaddle.y += playerPaddle.dy;
            }
            break;
    }
});


