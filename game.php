<?php
    session_start();

    $playerClass = isset($_GET['class']) ? $_GET['class'] : 'hunter';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Tiny Game</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
            background: #000;
        }

        #game-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 100vw;
            position: relative;
        }

        canvas {
            image-rendering: pixelated;
            background: #000;
        }
    </style>

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
<body onload="onBodyLoad()">
    <div id="game-wrapper">
        <canvas id="canvas"></canvas>
    </div>
</body>
</html>
