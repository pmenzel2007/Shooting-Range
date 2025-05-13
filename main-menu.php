<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Main Menu</title>
    <style>
        body {
            margin: 0;
            font-family: 'Segoe UI', sans-serif;
            background-color: #222;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .menu-container {
            text-align: center;
            background-color: #333;
            padding: 40px 60px;
            border-radius: 12px;
            box-shadow: 0 0 20px rgba(0,0,0,0.6);
        }

        h1 {
            margin-bottom: 40px;
            color: #F5F5DC;
        }

        .menu-button {
            display: block;
            width: 250px;
            margin: 15px auto;
            padding: 15px;
            font-size: 18px;
            background-color: #444;
            color: #fff;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.2s ease;
        }

        .menu-button:hover {
            background-color: #666;
        }

        .footer {
            margin-top: 30px;
            font-size: 14px;
            color: #aaa;
        }
    </style>
</head>
<body>

<div class="menu-container">
    <h1>Main Menu</h1>
    <form action="character-select.php" method="get">
        <button class="menu-button">Start Game</button>
    </form>

    <form action="highscores.php" method="get">
        <button class="menu-button">High Scores</button>
    </form>

    <form action="settings.php" method="get">
        <button class="menu-button">Settings</button>
    </form>

    <form action="logout.php" method="post">
        <button class="menu-button">Log Out</button>
    </form>

</div>

</body>
</html>
