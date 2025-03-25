<?php
// Include the database configuration file
require_once 'config.php';

$conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    echo json_encode(array('Status' => false, 'message' => 'Connection failed', 'error' => $conn->connect_error));
    exit;
}

// Check if ZipCodeID is set in the POST request
if (isset($_POST['ZipCodeID'])) {
    // Sanitize the input
    $zipCodeID = mysqli_real_escape_string($conn, $_POST['ZipCodeID']);

    // SQL query to delete the ZipCode
    $sql = "DELETE FROM `AvalableZipCodes` WHERE `ZipCodeID` = '$zipCodeID'";

    if ($conn->query($sql)) {
        // If deletion is successful, send a success response
        $response = array('Status' => true, 'Message' => 'ZipCode deleted successfully');
    } else {
        // If there is an error, send an error response
        $response = array('Status' => false, 'Message' => 'Error deleting ZipCode: ' . $conn->error);
    }
} else {
    // If ZipCodeID is not set in the POST request, send an error response
    $response = array('Status' => false, 'Message' => 'ZipCodeID not provided');
}

// Output JSON response
echo json_encode($response);

// Close the database connection
$conn->close();
?>