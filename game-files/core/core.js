let canvas;
let ctx;
let startTime;

let player;
let debugEnemy;
let enemies = [];

let time;
let seconds;
let minutes;

let spawTimer = 0;
let spawnInterval = STARTING_SPAWN_INTERVAL;
let lastSpawnTime;

let lastSpawns = [];

let camera;

function onBodyLoad() {
    startTime = performance.now();
    lastSpawnTime = startTime;

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d')

    canvas.width = VIEWPORT_WIDTH;
    canvas.height = VIEWPORT_HEIGHT;

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    player = new Hunter();

    debugEnemy = new Crawler(200, 200);
    enemies.push(debugEnemy, new Crawler(400, 400), new Sprinter(2500, 2500), new Spitter(400, 2500));
    console.log(enemies);

    camera = new Camera();
    gameLoop();
}

function resizeCanvas() {
    const scale = Math.min(
        window.innerWidth / VIEWPORT_WIDTH,
        window.innerHeight / VIEWPORT_HEIGHT
    );
    canvas.style.width = VIEWPORT_WIDTH * scale + 'px';
    canvas.style.height = VIEWPORT_HEIGHT * scale + 'px';
}

function updateWorld() {
    player.updatePlayer(enemies);
    let playerParams = player.getParams(); 

    for (let enemy of enemies) {
        enemy.updateEnemy(playerParams, enemies);
    }
    enemies = enemies.filter(enemy => enemy.getAlive());

    camera.updateCamera(playerParams);
}

function drawWorld() {
    ctx.clearRect(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);

    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);

    ctx.save();

    ctx.scale(camera.getZoom(), camera.getZoom());

    ctx.translate(-camera.getX(), -camera.getY());

    ctx.strokeStyle = 'white';
    ctx.strokeRect(0, 0, ARENA_WIDTH, ARENA_HEIGHT);

    player.drawColor(ctx, 'lime');

    for (const enemy of enemies) {
        enemy.drawColor(ctx, 'red');
    }

    for (const projectile of player.getParams().projectiles) {
        projectile.drawColor(ctx, 'blue');
    }

    ctx.restore();

    ctx.save();
    ctx.fillStyle = 'white';
    ctx.font = '64px monospace';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    ctx.fillText(timeString, canvas.width - 10, 10);
    ctx.restore();

    ctx.save();
    const squareSize = 30;
    const spacing = 5;
    const hpX = 10;
    const hpY = 10;

    for (let i = 0; i < player.getParams().playerHp; i++) {
        ctx.fillStyle = 'red';
        ctx.fillRect(hpX + i * (squareSize + spacing), hpY, squareSize, squareSize);
    }
    ctx.restore();

}

function updateTime() {
    time = Math.floor(performance.now() - startTime);
    seconds = Math.floor((time / 1000) % 60);
    minutes = Math.floor((time / 1000) / 60);
}

function chooseSpawnType() {
    let choices = SPAWN_TYPES.filter(type =>
        !(lastSpawns[0] === type && lastSpawns[1] === type)
    );

    let choice = choices[Math.floor(Math.random() * choices.length)];
    lastSpawns.push(choice);
    if (lastSpawns.length > 2) lastSpawns.shift();
    return choice;
}

function isFarFromPlayer(x, y, playerCenterX, playerCenterY) {
    const dx = x - playerCenterX;
    const dy = y - playerCenterY;
    return Math.sqrt(dx * dx + dy * dy) > MIN_SPAWN_DISTANCE;
}


function gameLoop() {
    updateTime();
    updateWorld();
    drawWorld();
    if (player.alive)
        requestAnimationFrame(gameLoop);
}