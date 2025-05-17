<?php
    session_start();
    
    if (!isset($_SESSION["username"])) {
        header("Location: index.php");
        exit();
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Select Your Character</title>
    <link rel="stylesheet" href="style.css">
</head>
<body class="character-select">
    <div class="character-select">
        <h1>Select Your Character</h1>
        <button class="button" onclick="startGame('hunter')">Hunter</button>
        <button class="button" onclick="startGame('gunner')">Gunner</button>
    </div>

    <script>
        function startGame(className) {
            window.location.href = `game.php?class=${className}`;
        }
    </script>
</body>
</html>
