let canvas = document.getElementById("snake"); // ELEMENTO QUE IRÁ RODAR O JOGO
let context = canvas.getContext("2d");
let box = 32;
let snake = []; // COBRA COMO UMA LISTA, JÁ QUE ELA VAI SER UMA SÉRIE DE COORDENADAS, QUE QUANDO PINTADAS CRIAM OS QUADRADINHOS
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box); // DESENHA O RETÂNGULO USANDO X E Y COM LARGURA E ALTURA SETADAS
}

function criarCobra() {
    for(i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function criarComida() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

function update(event) {
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

document.addEventListener('keydown', update); // QUANDO UM EVENTO DE TECLADO ACONTECE, DETECTA E CHAMA A FUNÇÃO UPDATE

function iniciarJogo() {
    // SAIU DA TELA, RETORNA PARA A TELA
    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    // COLISÃO E FIM DO JOGO
    for(i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert('Game Over! Try Again! :)');
            document.location.reload(true);
        }
    }

    criarBG();
    criarCobra();
    criarComida();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // MOVIMENTO DA COBRA
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y) {
        snake.pop(); // POP REMOVE O ÚLTIMO ELEMENTO DA LISTA
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); // UNSHIFT ADICIONA ELEMENTO COMO PRIMEIRO DA LISTA
}

let jogo = setInterval(iniciarJogo, 100);