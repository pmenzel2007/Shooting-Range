<?php
    session_start();

    if (!isset($_SESSION["username"])) {
        header("Location: index.php");
        exit();
    }

    $playerClass = isset($_GET['class']) ? $_GET['class'] : 'hunter';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Shooting Range</title>
    <link rel="stylesheet" href="style.css">
    <script>
        const SELECTED_CLASS = "<?php echo $playerClass; ?>";
    </script>

    <script src="game-files/core/constants.js"></script>
    <script src="game-files/base/collisionbox.js"></script>
    <script src="game-files/base/collisionbox-circle.js"></script>
    <script src="game-files/base/gameObject.js"></script>
    <script src="game-files/core/spawner.js"></script>
    <script src="game-files/base/projectile.js"></script>
    <script src="game-files/player/player.js"></script>
    <script src="game-files/player/hunter.js"></script>
    <script src="game-files/player/arrow.js"></script>
    <script src="game-files/player/gunner.js"></script>
    <script src="game-files/player/bullet.js"></script>
    <script src="game-files/enemy/enemy.js"></script>
    <script src="game-files/enemy/crawler-enemy.js"></script>
    <script src="game-files/enemy/sprinter-enemy.js"></script>
    <script src="game-files/enemy/spitter-enemy.js"></script>
    <script src="game-files/enemy/spit-projectile.js"></script>
    <script src="game-files/core/camera.js"></script>
    <script src="game-files/core/core.js"></script>
</head>
<body onload="onBodyLoad()" class="game">
    <div id="game-wrapper">
        <canvas id="canvas"></canvas>
    </div>

    <div id="overlay" class="hidden">
    <div id="overlay-content">
        <h1 id="overlay-title">Game Paused</h1>
        <button onclick="resumeGame()">Resume</button>
        <button onclick="restartGame()">Reselect Class</button>
        <button onclick="returnToMenu()">Return to Menu</button>
    </div>
</div>
</body>
</html>
