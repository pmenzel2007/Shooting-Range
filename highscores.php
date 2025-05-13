<?php
session_start();

if (!isset($_SESSION["username"])) {
    header("Location: index.php");
    exit();
}

require_once "db.php";

// Fetch users ordered by highscore (highest first)
$stmt = $pdo->query("SELECT displayname, highscore FROM user ORDER BY highscore DESC");
$users = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Highscores</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body {
      background-color: #111;
      color: #f5f5f5;
      font-family: 'Arial', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px;
    }

    h1 {
      color: #f5f5dc;
      margin-bottom: 30px;
    }

    table {
      width: 90%;
      max-width: 500px;
      border-collapse: collapse;
      background-color: #222;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    }

    th, td {
      padding: 12px 20px;
      text-align: left;
    }

    th {
      background-color: #333;
      color: #4CAF50;
    }

    tr:nth-child(even) {
      background-color: #2a2a2a;
    }

    tr:nth-child(odd) {
      background-color: #1e1e1e;
    }

    tr:hover {
      background-color: #3a3a3a;
    }

    .rank {
      width: 60px;
      text-align: center;
    }

    .back-link {
      margin-top: 20px;
      color: #4CAF50;
      text-decoration: none;
      font-size: 14px;
    }

    .back-link:hover {
      color: #66BB6A;
    }
  </style>
</head>
<body>

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
