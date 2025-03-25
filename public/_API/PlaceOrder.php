<?php
// Include the database configuration file
require_once 'config.php';


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include the PHPMailer autoloader
require 'src/Exception.php';
require 'src/PHPMailer.php';
require 'src/SMTP.php';

$mail = new PHPMailer(true);

// Set the Access-Control-Allow-Origin header to allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Set the Access-Control-Allow-Methods header to allow the specified HTTP methods
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Set the Access-Control-Allow-Headers header to allow the specified headers
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Cache-Control, access_token");

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

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Ensure that the necessary POST parameters are provided
    if (isset($_POST['User_ID'], $_POST['AddressID'])) {
        $user_id = $_POST['User_ID'];
        $addressid = $_POST["AddressID"];

        // Create a new MySQLi connection
        $conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

        // Check for database connection errors
        if ($conn->connect_error) {
            sendResponse(false, 'Connection failed: ' . $conn->connect_error);
        }

        // Get the current date and time
        $order_date = date('Y-m-d H:i:s');

        // Create an entry in the "Orders" table
        $sqlInsertOrder = "INSERT INTO Orders (User_ID, AddressID, order_date, status)
                           VALUES ('$user_id', '$addressid', '$order_date', 'Pending')";

        if ($conn->query($sqlInsertOrder)) {
            $order_id = $conn->insert_id; // Get the last inserted order ID
            
            // Now, retrieve the cart details from the database
            $cartQuery = "SELECT UserCartDetails_ID, Product_id, Qty FROM UserCartDetails WHERE User_ID = $user_id";
            $cartResult = $conn->query($cartQuery);

            if ($cartResult) {
                while ($cartItem = $cartResult->fetch_assoc()) {
                    $product_id = $cartItem['Product_id'];
                    $quantity = $cartItem['Qty'];
                    $productQuery = "SELECT Product_id, Product_name, Product_originalPrice, Product_offerPrice, isSale
                        FROM Products
                        WHERE Product_id = $product_id";
                        $productResult = $conn->query($productQuery);
                        if ($productResult) {
                            $productData = $productResult->fetch_assoc();
                            $product_price = $productData['isSale'] == "1" ? $productData['Product_offerPrice'] : $productData['Product_originalPrice'];
                        } else {
                            $conn->close();
                            sendResponse(false, 'Error retrieving product details.');
                        }

                    // You can calculate the TotalPrice based on the product's price or any other method you prefer
                    $total_price = $quantity * $product_price; // Replace product_price with the actual price retrieval method

                    // Insert cart items into the "OrderDetails" table
                    $sqlInsertOrderDetail = "INSERT INTO OrderDetails (order_ID, Product_id, Quantity, TotalPrice)
                                            VALUES ('$order_id', '$product_id', '$quantity', '$total_price')";

                    $conn->query($sqlInsertOrderDetail);
                    // Delete cart items from the "UserCartDetails" table after successful order placement
                    $sqlDeleteCartItems = "DELETE FROM UserCartDetails WHERE User_ID = $user_id";
                    $conn->query($sqlDeleteCartItems);
                }
                try {
                    // Fetch user's email from the database
                    $emailQuery = "SELECT `Email` FROM `UserDetails` WHERE `User_ID` = '$user_id'";
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
                        
                        
                        $mail->Body = '<html><body><h1>Your Order Details</h1><p>Order ID: ' . "$order_id" . '</p><table border="1"><thead><tr><th>Product ID</th><th>Product Name</th><th>Quantity</th><th>Total Price</th></tr></thead><tbody>';
                        
                        // Now, retrieve the cart details from the database
                        $cartQuery = "SELECT * FROM `OrderDetails` , `Products` WHERE `Products`.`Product_id` = `OrderDetails`.`Product_id` AND `order_ID` = '$order_id'";
                        $cartResult = $conn->query($cartQuery);
                        
                        if ($cartResult) {
                            while ($cartItem = $cartResult->fetch_assoc()) {
                                $mail->Body .= '<tr>';
                                $mail->Body .= '<td>' . $cartItem['Product_id'] . '</td>';
                                $mail->Body .= '<td>' . $cartItem['Product_name'] . '</td>';
                                $mail->Body .= '<td>' . $cartItem['Quantity'] . '</td>';
                                $mail->Body .= '<td>' . $cartItem['TotalPrice'] . '</td>';
                                $mail->Body .= '</tr>';
                            }
                        } else {
                            $conn->close();
                            sendResponse(false, 'Error retrieving cart details for email.');
                        }
                        
                        $mail->Body .= '</tbody></table></body></html>';
                
                        // Send email
                        $mail->send();
                        sendResponse(true, 'Order created successfully. Order ID: ' . "$order_id" . '. Email sent.');
                        
                    $conn->close();
                    } else {
                        // User's email not found
                        sendResponse(false, 'Error retrieving user\'s email.');
                        
                    $conn->close();
                    }
                } catch (Exception $e) {
                    sendResponse(false, 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo);
                }
            } else {
                $conn->close();
                sendResponse(false, 'Error retrieving cart details.');
            }
        } else {
            $conn->close();
            sendResponse(false, $sqlInsertOrder);
        }
    } else {
        sendResponse(false, 'Incomplete POST data. Please provide User_ID and AddressID.');
    }
} else {
    sendResponse(false, 'Invalid request method. Please use POST for this operation.');
}