<?php
// Include the database configuration file
require_once 'config.php';

$conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    echo json_encode(array('Status' => false, 'message' => 'Connection failed', 'error' => $conn->connect_error));
    exit;
}

// Check if Subcat_id is set in the POST data
if (isset($_POST['Subcat_id'])) {
    // Sanitize the input
    $subcatId = mysqli_real_escape_string($conn, $_POST['Subcat_id']);

    // SQL query to delete the SubBrand
    $sql = "DELETE FROM Brands_Subcat WHERE Subcat_id = '$subcatId'";

    if ($conn->query($sql) === TRUE) {
        // Successfully deleted
        $response = array('status' => true, 'message' => 'SubBrand deleted successfully');
    } else {
        // Error in deletion
        $response = array('status' => false, 'message' => 'Error deleting SubBrand: ' . $conn->error);
    }
} else {
    // Subcat_id not set in POST data
    $response = array('status' => false, 'message' => 'Subcat_id not provided');
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);

// Close the database connection
$conn->close();
?>