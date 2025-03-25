<?php
// Include the database configuration file
require_once 'config.php';

$conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    echo json_encode(array('Status' => false, 'message' => 'Connection failed', 'error' => $conn->connect_error));
    exit;
}

// Check if required data is set in the POST data
if (isset($_POST['Subcat_id'], $_POST['SubBrand_Name'], $_POST['ConnectedToBrand_id'])) {
    // Sanitize the input
    $subcatId = mysqli_real_escape_string($conn, $_POST['Subcat_id']);
    $subBrandName = mysqli_real_escape_string($conn, $_POST['SubBrand_Name']);
    $connectedToBrandId = mysqli_real_escape_string($conn, $_POST['ConnectedToBrand_id']);

    // SQL query to update the SubBrand
    $sql = "UPDATE Brands_Subcat 
            SET Subcat_Name = '$subBrandName', ConnectedToBrand_id = '$connectedToBrandId'
            WHERE Subcat_id = '$subcatId'";

    if ($conn->query($sql) === TRUE) {
        // Successfully updated
        $response = array('status' => true, 'message' => 'SubBrand updated successfully');
    } else {
        // Error in update
        $response = array('status' => false, 'message' => 'Error updating SubBrand: ' . $conn->error);
    }
} else {
    // Required data not set in POST data
    $response = array('status' => false, 'message' => 'Incomplete data provided');
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);

// Close the database connection
$conn->close();
?>
