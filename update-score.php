<?php
session_start();

if (!isset($_SESSION["username"])) {
    header("Location: index.php");
    exit();
}

require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $score = isset($_POST["score"]) ? (int)$_POST["score"] : 0;

    // Update only if the new score is higher
    $stmt = $pdo->prepare("UPDATE user SET highscore = GREATEST(highscore, :score) WHERE username = :username");
    $stmt->execute([
        'score' => $score,
        'username' => $_SESSION["username"]
    ]);
}
?>
