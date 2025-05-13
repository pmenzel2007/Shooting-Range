<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Select Your Character</title>
    <style>
        body {
            margin: 0;
            background-color: #111;
            color: white;
            font-family: monospace;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .character-select {
            text-align: center;
        }

        h1 {
            margin-bottom: 30px;
            color: #F5F5DC;
        }

        .button {
            padding: 20px 40px;
            margin: 20px;
            font-size: 20px;
            background-color: #333;
            color: white;
            border: 2px solid white;
            cursor: pointer;
            transition: background-color 0.3s;
            border-radius: 10px;
        }

        .button:hover {
            background-color: #555;
        }
    </style>
</head>
<body>
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
