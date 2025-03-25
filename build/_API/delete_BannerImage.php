<?php
// Include the database configuration file
require_once 'config.php';

$conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    echo json_encode(array('Status' => false, 'message' => 'Connection failed', 'error' => $conn->connect_error));
    exit;
}

// Check if BannerID is set in the POST request
if (isset($_POST['BannerID'])) {
    // Sanitize the input
    $BannerID = mysqli_real_escape_string($conn, $_POST['BannerID']);

    // SQL query to delete the BannerID
    $sql = "DELETE FROM `Home_Slider_Images` WHERE `Home_Slider_Image_ID` = '$BannerID'";

    if ($conn->query($sql)) {
        // If deletion is successful, send a success response
        $response = array('Status' => true, 'Message' => 'BannerID deleted successfully');
    } else {
        // If there is an error, send an error response
        $response = array('Status' => false, 'Message' => 'Error deleting BannerID: ' . $conn->error);
    }
} else {
    // If BannerID is not set in the POST request, send an error response
    $response = array('Status' => false, 'Message' => 'BannerID not provided');
}

// Output JSON response
echo json_encode($response);

// Close the database connection
$conn->close();
?>