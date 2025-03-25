<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include the PHPMailer autoloader
require 'src/Exception.php';
require 'src/PHPMailer.php';
require 'src/SMTP.php';
// Include the database configuration file
require_once '../config.php';

// After the successful order creation, add the following code to send the email
// Assuming $user_id contains the user's ID and $order_id contains the order ID

$mail = new PHPMailer(true);

// Create a new MySQLi connection
        $conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

        // Check for database connection errors
        if ($conn->connect_error) {
            sendResponse(false, 'Connection failed: ' . $conn->connect_error);
        }

try {
    // Fetch user's email from the database
    $emailQuery = "SELECT `Email` FROM `UserDetails` WHERE `User_ID` = '23'";
    $emailResult = $conn->query($emailQuery);

    if ($emailResult && $emailResult->num_rows > 0) {
        $userData = $emailResult->fetch_assoc();
        $to = $userData['Email'];

        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.hostinger.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'noreply@theeliteenterprise.in';                     //SMTP username
        $mail->Password   = 'Noreply@Elite@2025';                         //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port       = 465;                                    //TCP port to connect to
        
        //Recipients
        $mail->setFrom('noreply@theeliteenterprise.in', 'Elite Ent');


        // Email content
        $mail->setFrom('support@theeliteenterprise.in', 'Elite Ent');
        $mail->addAddress($to);
        $mail->isHTML(true);
        $mail->Subject = 'Your Order is Successful';
        $mail->Body = '<html><body><h1>Your Order Details</h1><p>Order ID: ' . "orderid2" . '</p></body></html>';

        // Send email
        $mail->send();
        sendResponse(true, 'Order created successfully. Order ID: ' . "orderid2" . '. Email sent.');
    } else {
        // User's email not found
        sendResponse(false, 'Error retrieving user\'s email.');
    }
} catch (Exception $e) {
    sendResponse(false, 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo);
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
?>
