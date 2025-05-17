<?php
session_start();

if (!isset($_SESSION["username"])) {
    header("Location: index.php");
    exit();
}

require_once "db.php";

$stmt = $pdo->query("SELECT displayname, highscore FROM user ORDER BY highscore DESC");
$users = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Highscores</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="style.css">
</head>
<body class="highscores">

  <h1>Highscores</h1>

  <table>
    <tr>
      <th class="rank">#</th>
      <th>Display Name</th>
      <th>Highscore</th>
    </tr>
    <?php
      $rank = 1;
      foreach ($users as $user):
    ?>
      <tr>
        <td class="rank"><?= $rank++ ?></td>
        <td><?= htmlspecialchars($user['displayname']) ?></td>
        <td><?= $user['highscore'] ?></td>
      </tr>
    <?php endforeach; ?>
  </table>

  <a class="back-link" href="main-menu.php">← Back to Menu</a>

</body>
</html>
