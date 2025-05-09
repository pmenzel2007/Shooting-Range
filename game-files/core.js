let canvas;
let ctx;

let player;
let debugEnemy;
let enemies = [];

let camera;

function onBodyLoad() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d')

    canvas.width = VIEWPORT_WIDTH;
    canvas.height = VIEWPORT_HEIGHT;

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    player = new Hunter();

    debugEnemy = new Crawler(200, 200);
    enemies.push(debugEnemy, new Crawler(400, 400));
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
        projectile.drawColor(ctx, 'purple');
    }

    ctx.restore();
}

function gameLoop() {
    updateWorld();
    drawWorld();
    requestAnimationFrame(gameLoop);
}