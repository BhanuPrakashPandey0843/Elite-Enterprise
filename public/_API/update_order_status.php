<?php
// Include the database configuration file
require_once 'config.php';
// Create a new MySQLi connection
    $conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
    

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $orderId = $_POST['orderId'];
    $newStatus = $_POST['newStatus'];

    // Use prepared statement to prevent SQL injection
    $stmt = $conn->prepare("UPDATE `Orders` SET `status` = ? WHERE `order_ID` = ?");
    $stmt->bind_param("si", $newStatus, $orderId);

    if ($stmt->execute()) {
        echo "Success";
    } else {
        echo "Error updating order status";
    }

    $stmt->close();
    $conn->close();
}
?>
