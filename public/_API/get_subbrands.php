<?php
// Include your database connection code here if it's not already included
include_once "config.php";

$conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    echo json_encode(array('status' => false, 'message' => 'Connection failed', 'error' => $conn->connect_error));
    exit;
}

// Check if the brandId is provided in the POST request
if (isset($_POST['brandId'])) {
    $brandId = $_POST['brandId'];

    // Sanitize the input (validate and escape it)
    $brandId = intval($brandId);

    // Construct the SQL query
    $sql = "SELECT Subcat_id, Subcat_Name FROM Brands_Subcat WHERE ConnectedToBrand_id = $brandId";

    // Execute the query
    $result = $conn->query($sql);

    if ($result) {
        // Create an array to store subbrands
        $subbrands = [];

        // Fetch and store subbrands in the array
        while ($row = $result->fetch_assoc()) {
            $subbrands[] = [
                'Subcat_id' => $row['Subcat_id'],
                'Subcat_Name' => $row['Subcat_Name'],
            ];
        }

        // Return subbrands as JSON response
        header('Content-Type: application/json');
        echo json_encode($subbrands);
    } else {
        // Handle any query execution error
        echo json_encode(['error' => $conn->error]);
    }
} else {
    // Handle the case when brandId is not provided
    echo json_encode(['error' => 'Brand ID not provided']);
}

// Close the database connection
$conn->close();
?>