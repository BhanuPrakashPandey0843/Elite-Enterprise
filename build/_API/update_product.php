<?php
// Include the database configuration file
require_once 'config.php';

// Create a connection to the database
$conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Check connection
if ($conn->connect_error) {
    echo json_encode(array('Status' => false, 'message' => 'Connection failed', 'error' => $conn->connect_error));
    exit;
}

// Retrieve JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Check if the required data is provided
if (!isset($data['Product_id']) ||
    !isset($data['Product_originalPrice']) ||
    !isset($data['Product_offerPrice']) ||
    !isset($data['isFeatured']) ||
    !isset($data['isSale']) ||
    !isset($data['isNew']) ||
    !isset($data['Stock']) ||
    !isset($data['Alert_Stock_Below'])) {

    echo json_encode(array('Status' => false, 'message' => 'Missing required fields'));
    exit;
}

// Prepare the SQL statement with placeholders
$sql = "UPDATE `Products` SET 
            `Product_originalPrice` = ?,
            `Product_offerPrice` = ?,
            `isFeatured` = ?,
            `isSale` = ?,
            `isNew` = ?,
            `Stock` = ?,
            `Alert_Stock_Below` = ?
        WHERE `Product_id` = ?";

// Initialize the statement
$stmt = $conn->prepare($sql);

// Check if the statement was prepared successfully
if (!$stmt) {
    echo json_encode(array('Status' => false, 'message' => 'Failed to prepare the SQL statement', 'error' => $conn->error));
    exit;
}

// Bind the parameters to the SQL statement
$stmt->bind_param(
    'sssssssi',
    $data['Product_originalPrice'],
    $data['Product_offerPrice'],
    $data['isFeatured'],
    $data['isSale'],
    $data['isNew'],
    $data['Stock'],
    $data['Alert_Stock_Below'],
    $data['Product_id']
);

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(array('Status' => true, 'message' => 'Record updated successfully'));
} else {
    echo json_encode(array('Status' => false, 'message' => 'Failed to update record', 'error' => $stmt->error));
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>