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
        
        #overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.85);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10;
        }

        #overlay-content {
            text-align: center;
            background-color: #222;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 0 20px rgba(0,0,0,0.8);
        }

        #overlay h1 {
            color: #F5F5DC;
            margin-bottom: 30px;
        }

        #overlay button {
            display: block;
            width: 200px;
            margin: 15px auto;
            padding: 12px;
            font-size: 16px;
            background-color: #444;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.2s ease;
        }

        #overlay button:hover {
            background-color: #666;
        }

        #overlay.hidden {
            display: none;
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
