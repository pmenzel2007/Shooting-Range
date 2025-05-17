<?php
session_start();
require_once "db.php";

$loginError = "";
$registerSuccess = "";
$registerError = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['form_type']) && $_POST['form_type'] === "login") {
        if (isset($_POST['username']) && isset($_POST['password'])) {
            $stmt = $pdo->prepare("SELECT * FROM user WHERE username = :username");
            $stmt->execute(['username' => $_POST['username']]);
            $user = $stmt->fetch();

            if ($user && password_verify($_POST['password'], $user['password'])) {
                $_SESSION["username"] = $user["username"];
                $_SESSION["displayname"] = $user["displayname"];
                header("Location: main-menu.php");
                exit();
            } else {
                $loginError = "Invalid username or password!";
            }
        }
    }

    if (isset($_POST['form_type']) && $_POST['form_type'] === "register") {
        if (
            isset($_POST['reg_username']) &&
            isset($_POST['reg_displayname']) &&
            isset($_POST['reg_password']) &&
            isset($_POST['reg_password_again'])
        ) {
            if ($_POST['reg_password'] !== $_POST['reg_password_again']) {
                $registerError = "Passwords must be the same";
            } else {
                $stmt = $pdo->prepare("SELECT * FROM user WHERE username = :username");
                $stmt->execute(['username' => $_POST['reg_username']]);
                if ($stmt->fetch()) {
                    $registerError = "Username already exists!";
                } else {
                    $hashedPassword = password_hash($_POST['reg_password'], PASSWORD_DEFAULT);
                    $stmt = $pdo->prepare("INSERT INTO user (username, displayname, password) VALUES (:username, :displayname, :password)");
                    $stmt->execute([
                        'username' => $_POST['reg_username'],
                        'displayname' => $_POST['reg_displayname'],
                        'password' => $hashedPassword
                    ]);
                    $registerSuccess = "Registration successful! Please log in.";
                }
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login / Register</title>
    <link rel="stylesheet" href="style.css">
</head>
<body class="login">

    <div class="container">
        <h3 id="currentActionTitle">Login</h3>

        <?php if (!empty($loginError)) echo "<div class='error'>$loginError</div>"; ?>
        <?php if (!empty($registerError)) echo "<div class='error'>$registerError</div>"; ?>
        <?php if (!empty($registerSuccess)) echo "<div class='success'>$registerSuccess</div>"; ?>

        <!-- Login Form -->
        <form id="loginForm" method="post">
            <input type="hidden" name="form_type" value="login">
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>

        <div class="toggle-btn" id="loginToggleBtn">
            <a href="#" onclick="showRegisterForm()">Don't have an account? Register</a>
        </div>

        <!-- Register Form -->
        <form id="registerForm" method="post" style="display: none;">
            <input type="hidden" name="form_type" value="register">
            <input type="text" name="reg_username" placeholder="Username" required>
            <input type="text" name="reg_displayname" placeholder="Display Name" required>
            <input type="password" name="reg_password" placeholder="Password" required>
            <input type="password" name="reg_password_again" placeholder="Enter Password again" required>
            <button type="submit">Register</button>
        </form>

        <div class="toggle-btn" id="registerToggleBtn" style="display: none;">
            <a href="#" onclick="showLoginForm()">Already have an account? Login</a>
        </div>
    </div>

    <script>
        function showRegisterForm() {
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('registerForm').style.display = 'block';
            document.getElementById('currentActionTitle').innerText = 'Register';
            document.getElementById('loginToggleBtn').style.display = 'none';
            document.getElementById('registerToggleBtn').style.display = 'block';
        }

        function showLoginForm() {
            document.getElementById('registerForm').style.display = 'none';
            document.getElementById('loginForm').style.display = 'block';
            document.getElementById('currentActionTitle').innerText = 'Login';
            document.getElementById('loginToggleBtn').style.display = 'block';
            document.getElementById('registerToggleBtn').style.display = 'none';
        }
    </script>

</body>
</html>
