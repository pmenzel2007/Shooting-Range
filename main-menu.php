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
    <title>Main Menu</title>
    <link rel="stylesheet" href="style.css">
</head>
<body class="menu">

<div class="menu-container">
    <h1>Main Menu <br>
        <?php
            echo "Welcome, " . $_SESSION['displayname'];
        ?>
</h1>
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
