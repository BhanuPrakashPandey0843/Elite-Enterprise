<?php

// Include the database configuration file
require_once 'config.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include the PHPMailer autoloader
require 'src/Exception.php';
require 'src/PHPMailer.php';
require 'src/SMTP.php';

// Set the Access-Control-Allow-Origin header to allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Set the Access-Control-Allow-Methods header to allow the specified HTTP methods
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Set the Access-Control-Allow-Headers header to allow the specified headers
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Cache-Control, access_token");



// Decrypt function with IV
function decryptData($encryptedData, $key) {
    $iv = 'tHis1s1v123aBcD3';
    $decryptedData = openssl_decrypt($encryptedData, 'aes-256-cbc', $key, OPENSSL_RAW_DATA, $iv);
    echo $decryptedData."enc".$encryptedData;
    return $decryptedData;
}

// Function to set the HTTP response status code and send a JSON response
function sendResponse($status, $message) {
    $response = array(
        'status' => $status,
        'message' => $message
    );
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

// Function to set the HTTP response status code and send a JSON response
function sendResponseUser($status, $message , $userId) {
    $response = array(
        'status' => $status,
        'message' => $message,
        'cbB2kas1v5wa2987ku' => $userId
    );
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['email']) && isset($_POST['otp'])) {
    // Validate and sanitize email
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $otp = filter_var($_POST['otp'], FILTER_SANITIZE_STRING);
    

    // // Encrypted data received from the frontend (you'll need to replace this with your actual encrypted data)
    // $encrypted_data = $_POST['otp'];
    
    // // Your encryption key (should match the one used for encryption)
    // $encryption_key = 'tHis1sK3y123aBcD';
    
    // $deotp = decryptData($encrypted_data,$encryption_key);

    // Check if email is provided
    if (empty($email)) {
        sendResponse(false, 'Email is required.');
    }

    // Create a new MySQLi connection
    $conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

    // Check for database connection errors
    if ($conn->connect_error) {
        sendResponse(false, 'Connection failed: ' . $conn->connect_error);
    }

    try {
        // Fetch user's user_id from the database using the provided email
        $emailQuery = "SELECT `User_ID` FROM `UserDetails` WHERE `Email` = '$email'";
        $emailResult = $conn->query($emailQuery);

        if ($emailResult && $emailResult->num_rows > 0) {
            $userData = $emailResult->fetch_assoc();
            $userID = $userData['User_ID'];

            // Send OTP to the user's email
            $mail = new PHPMailer(true);
            $mail->isSMTP();                      // Send using SMTP
            $mail->Host       = 'smtp.hostinger.com';  // SMTP server
            $mail->SMTPAuth   = true;             // Enable SMTP authentication
            $mail->Username   = 'noreply@theeliteenterprise.in'; // SMTP username
            $mail->Password   = 'Noreply@Elite@2025';   // SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Enable TLS encryption
            $mail->Port       = 465;              // TCP port
            $mail->setFrom('noreply@theeliteenterprise.in', 'Elite Ent'); // Sender email
            $mail->addAddress($email);            // Recipient email
            $mail->isHTML(true);
            $mail->Subject = 'Password Reset OTP';
            $mail->Body    = '<html><body><h1>Your Password Reset OTP Is: ' . $otp . '</h1></body></html>';

            // Send email
            $mail->send();

            // Close MySQL connection
            $conn->close();

            sendResponseUser(true, $otp ,$userID );
        } else {
            // User not found with provided email
            $conn->close();
            sendResponse(false, 'No user found with provided email.');
        }
    } catch (Exception $e) {
        sendResponse(false, 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo);
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['otp']) && isset($_POST['password']) && isset($_POST['user_id'])) {
    // Validate and sanitize OTP, password, and user_id
    $otp = filter_var($_POST['otp'], FILTER_SANITIZE_STRING);
    $password = filter_var($_POST['password'], FILTER_SANITIZE_STRING);
    $userID = filter_var($_POST['user_id'], FILTER_SANITIZE_NUMBER_INT);

    // Validate input
    if (empty($otp) || empty($password) || empty($userID)) {
        sendResponse(false, 'OTP, password, and user ID are required.');
    }

    // Verify OTP (For demonstration purpose, assume OTP is correct)

    // Create a new MySQLi connection
    $conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

    // Check for database connection errors
    if ($conn->connect_error) {
        sendResponse(false, 'Connection failed: ' . $conn->connect_error);
    }

    try {
        // Update user's password
        $updateQuery = "UPDATE `Login` SET `password`='$password' WHERE `User_ID` = $userID";
        $result = $conn->query($updateQuery);

        if ($result) {
            // Password updated successfully
            $conn->close();
            sendResponse(true, 'Password updated successfully.');
        } else {
            // Error updating password
            $conn->close();
            sendResponse(false, 'Error updating password.');
        }
    } catch (Exception $e) {
        sendResponse(false, 'An error occurred.');
    }
} else {
    // Invalid request method
    sendResponse(false, 'Invalid request method.');
}
?>