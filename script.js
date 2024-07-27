const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

let snake = [{ x: 200, y: 200 }];
let direction = { x: 20, y: 0 };
let food = { x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20 };

function drawSnake() {
    context.fillStyle = 'lime';
    snake.forEach(part => context.fillRect(part.x, part.y, 20, 20));
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        food = { x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20 };
    } else {
        snake.pop();
    }
}

function drawFood() {
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, 20, 20);
}

function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();
    drawSnake();
    drawFood();
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    if (keyPressed === 37 && direction.x === 0) { // Left arrow
        direction = { x: -20, y: 0 };
    } else if (keyPressed === 38 && direction.y === 0) { // Up arrow
        direction = { x: 0, y: -20 };
    } else if (keyPressed === 39 && direction.x === 0) { // Right arrow
        direction = { x: 20, y: 0 };
    } else if (keyPressed === 40 && direction.y === 0) { // Down arrow
        direction = { x: 0, y: 20 };
    }
}

document.addEventListener('keydown', changeDirection);
setInterval(update, 100);
