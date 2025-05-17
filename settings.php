<?php
session_start();
require_once "db.php";

if (!isset($_SESSION["username"])) {
    header("Location: index.php");
    exit();
}

$currentUsername = $_SESSION["username"];
$success = "";
$error = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $newUsername = $_POST["new_username"];
    $newDisplayname = $_POST["new_displayname"];
    $newPassword = $_POST["new_password"];
    $confirmPassword = $_POST["confirm_password"];

    if (!empty($newPassword) && $newPassword !== $confirmPassword) {
        $error = "Passwords do not match.";
    } else {
        try {
            if ($newUsername !== $currentUsername) {
                $stmt = $pdo->prepare("SELECT COUNT(*) FROM user WHERE username = :username");
                $stmt->execute(["username" => $newUsername]);
                if ($stmt->fetchColumn() > 0) {
                    $error = "Username already taken.";
                }
            }

            if (empty($error)) {
                $fields = ["displayname = :displayname"];
                $params = [
                    "displayname" => $newDisplayname,
                    "username" => $currentUsername
                ];

                if ($newUsername !== $currentUsername) {
                    $fields[] = "username = :new_username";
                    $params["new_username"] = $newUsername;
                }

                if (!empty($newPassword)) {
                    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
                    $fields[] = "password = :password";
                    $params["password"] = $hashedPassword;
                }

                $sql = "UPDATE user SET " . implode(", ", $fields) . " WHERE username = :username";
                $stmt = $pdo->prepare($sql);
                $stmt->execute($params);

                if ($newUsername !== $currentUsername) {
                    $_SESSION["username"] = $newUsername;
                }

                $success = "Settings updated successfully!";
            }
        } catch (PDOException $e) {
            $error = "Database error: " . $e->getMessage();
        }
    }
}

$stmt = $pdo->prepare("SELECT * FROM user WHERE username = :username");
$stmt->execute(["username" => $_SESSION["username"]]);
$user = $stmt->fetch();

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Settings</title>
    <link rel="stylesheet" href="style.css">
</head>
<body class="settings">

<div class="settings-container">
    <h2>Account Settings</h2>

    <form method="post">
        <input type="text" name="new_username" placeholder="New Username" value="<?= htmlspecialchars($user["username"]) ?>" required>
        <input type="text" name="new_displayname" placeholder="New Display Name" value="<?= htmlspecialchars($user["displayname"]) ?>" required>
        <input type="password" name="new_password" placeholder="New Password">
        <input type="password" name="confirm_password" placeholder="Confirm New Password">
        <button type="submit">Save Changes</button>
    </form>

    <div class="message">
        <?php if ($success): ?>
            <div class="success"><?= htmlspecialchars($success) ?></div>
        <?php elseif ($error): ?>
            <div class="error"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>
    </div>

    <a href="main-menu.php" class="back-link">← Back to Menu</a>
</div>

</body>
</html>
