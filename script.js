const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const finalScore = document.getElementById('finalScore');

const gridSize = 20;
let snake = [{ x: 10 * gridSize, y: 10 * gridSize }];
let direction = { x: gridSize, y: 0 };
let food = getRandomFoodPosition();
let score = 0;
let gameInterval;

function getRandomFoodPosition() {
    const x = Math.floor(Math.random() * canvas.width / gridSize) * gridSize;
    const y = Math.floor(Math.random() * canvas.height / gridSize) * gridSize;
    return { x, y };
}

function startGame() {
    canvas.width = 400;
    canvas.height = 400;
    snake = [{ x: 10 * gridSize, y: 10 * gridSize }];
    direction = { x: gridSize, y: 0 };
    food = getRandomFoodPosition();
    score = 0;
    startScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
    gameInterval = setInterval(updateGame, 100);
}

function updateGame() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    if (head.x === food.x && head.y === food.y) {
        food = getRandomFoodPosition();
        score++;
    } else {
        snake.pop();
    }
    snake.unshift(head);

    if (isCollision(head)) {
        endGame();
    }

    drawGame();
}

function isCollision(head) {
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

function endGame() {
    clearInterval(gameInterval);
    finalScore.innerText = `Score: ${score}`;
    gameOverScreen.style.display = 'flex';
}

function drawGame() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'lime';
    snake.forEach(part => context.fillRect(part.x, part.y, gridSize, gridSize));
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, gridSize, gridSize);
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const goingUp = direction.y === -gridSize;
    const goingDown = direction.y === gridSize;
    const goingRight = direction.x === gridSize;
    const goingLeft = direction.x === -gridSize;

    if (keyPressed === 37 && !goingRight) {
        direction = { x: -gridSize, y: 0 };
    } else if (keyPressed === 38 && !goingDown) {
        direction = { x: 0, y: -gridSize };
    } else if (keyPressed === 39 && !goingLeft) {
        direction = { x: gridSize, y: 0 };
    } else if (keyPressed === 40 && !goingUp) {
        direction = { x: 0, y: gridSize };
    } else if (keyPressed === 13 && (startScreen.style.display === 'flex' || gameOverScreen.style.display === 'flex')) {
        startGame();
    }
}

document.addEventListener('keydown', changeDirection);
startScreen.style.display = 'flex';
