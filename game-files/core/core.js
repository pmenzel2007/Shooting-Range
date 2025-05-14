let canvas;
let ctx;
let startTime;

let player;
let enemies = [];

let time;
let seconds;
let minutes;

let isPaused = false;
let isGameOver = false;

let spawTimer = 0;
let spawnInterval = STARTING_SPAWN_INTERVAL;
let lastSpawnTime;

let lastSpawns = [];

let spawners = [];
let nextSpawner = 30;

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

    player = SELECTED_CLASS === 'gunner' ? new Gunner() : new Hunter();

    spawnSpawner();

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !isGameOver) {
            isPaused = !isPaused;
            if (isPaused) {
                showOverlay("Game Paused");
            } else {
                hideOverlay();
                requestAnimationFrame(gameLoop);
            }
        }
    });

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

    if (minutes * 60 + seconds == nextSpawner) {
        spawnSpawner();
        nextSpawner += 30;
    }

    for (const spawner of spawners) {
        const newEnemies = spawner.update(minutes * 60 + seconds);
        enemies.push(...newEnemies);
    }

    for (let enemy of enemies) {
        enemy.updateEnemy(playerParams, enemies);
    }

    for (let i = enemies.length - 1; i >= 0; i--) {
        if (!enemies[i].getAlive()) enemies.splice(i, 1);
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

    ctx.fillStyle = '#C0C08F';
    ctx.fillRect(0, 0, ARENA_WIDTH, ARENA_HEIGHT);

    player.drawColor(ctx, 'black');

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
    ctx.font = '48px monospace';
    ctx.fillText(`Score: ${player.getParams().playerScore}`, canvas.width - 10, 80);
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

function spawnSpawner() {
    spawners.push(new Spawner(player, enemies, {
        startingInterval: STARTING_SPAWN_INTERVAL,
        minInterval: MIN_SPAWN_INTERVAL,
        decreaseRate: SPAWN_DECREASE_RATE,
        spawnTypes: SPAWN_TYPES,
        packSizes: {
            crawler: CRAWLER_PACK_SIZE,
            sprinter: SPRINTER_PACK_SIZE,
            spitter: SPITTER_PACK_SIZE
        },
        minDistance: MIN_SPAWN_DISTANCE
    }));

}

function showOverlay(title) {
    document.getElementById('overlay-title').textContent = title;
    document.getElementById('overlay').classList.remove('hidden');
}

function hideOverlay() {
    document.getElementById('overlay').classList.add('hidden');
}

function resumeGame() {
    hideOverlay();
    isPaused = false;
    requestAnimationFrame(gameLoop);
}

function restartGame() {
    window.location.href = 'character-select.php';
}

function returnToMenu() {
    window.location.href = 'main-menu.php';
}

function sendScoreToServer(score) {
    fetch('update-score.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'score=' + encodeURIComponent(score)
    })
    .then(response => response.text())
    .then(result => {
        console.log("Server response:", result);
    })
    .catch(error => {
        console.error("Error sending score:", error);
    });
}

function gameLoop() {
    updateTime();
    
    if (!isPaused && !isGameOver) {
        updateWorld();
        drawWorld();
        if (player.alive) {
            requestAnimationFrame(gameLoop);
        } else {
            showOverlay("Game Over");
            isGameOver = true;
            sendScoreToServer(player.getParams().playerScore);
        }
    } else {
        drawWorld();
    }
}


function logMovementSpeed(label, oldX, oldY, newX, newY) {
    const dx = newX - oldX;
    const dy = newY - oldY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    //console.log(`${label} moved: ${distance.toFixed(2)}px (dx: ${dx.toFixed(2)}, dy: ${dy.toFixed(2)})`);
}
