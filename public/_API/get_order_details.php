<?php
// get_order_details.php

// Include the database configuration file
require_once 'config.php';
// Create a new MySQLi connection
$conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if (isset($_POST['orderId'])) {
    $orderId = $_POST['orderId'];
    $AddressID = $_POST['AddressID'];
    $User_ID = $_POST['User_ID'];

    $sql = "SELECT od.OrderDetailID, od.order_ID, od.Product_id, od.Quantity, od.TotalPrice, 
                   p.Product_name, p.Product_originalPrice, p.Product_offerPrice, p.Product_img, 
                   p.Product_img2, p.Product_img3, p.Product_img4, p.isFeatured, p.isSale, p.isNew, 
                   p.ConnectedToBrand_id, p.ConnectedToSubBrand_id, p.Product_desc
            FROM OrderDetails od
            JOIN Products p ON od.Product_id = p.Product_id
            WHERE od.order_ID = $orderId";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo '<h2>Order Details</h2>';
        echo '<table class="table">';
        echo '<thead>';
        echo '<tr>';
        echo '<th>Product ID</th>';
        echo '<th>Product Name</th>';
        echo '<th>Quantity</th>';
        echo '<th>Total Price</th>';
        echo '<th>Product Image</th>'; // New column for product image
        // Add more columns as needed
        echo '</tr>';
        echo '</thead>';
        echo '<tbody>';
        while ($row = $result->fetch_assoc()) {
            echo '<tr>';
            echo '<td>' . $row['Product_id'] . '</td>';
            echo '<td>' . $row['Product_name'] . '</td>';
            echo '<td>' . $row['Quantity'] . '</td>';
            echo '<td>' . $row['TotalPrice'] . '</td>';
            // Add a cell for the product image
            echo '<td><img src="' . $row['Product_img'] . '" alt="Product Image" style="max-width: 50px; max-height: 50px;"></td>';
            // Add more cells as needed
            echo '</tr>';
        }
        echo '</tbody>';
        echo '</table>';
    } else {
        echo 'No order details found.';
    }
    // Separate SQL query for address details
    $addressSql = "SELECT `Addresses`.`Name`, `Addresses`.`StreetAddress`, `Addresses`.`City`, `Addresses`.`State`, `Addresses`.`ZipCode`, `Addresses`.`Contry`, `Addresses`.`company` 
                   ,`UserDetails`.`PhoneNumber` FROM Addresses , UserDetails 
                   WHERE `Addresses`.`AddressID` = $AddressID AND `UserDetails`.`User_ID` = $User_ID ";
               
    $addressResult = $conn->query($addressSql);

    if ($addressResult->num_rows > 0) {
        echo '<h2>Address Details</h2>';
        while ($addressRow = $addressResult->fetch_assoc()) {
            echo '<p><strong>Name:</strong> ' . $addressRow['Name'] . '</p>';
            echo '<p><strong>Street Address:</strong> ' . $addressRow['StreetAddress'] . '</p>';
            echo '<p><strong>City:</strong> ' . $addressRow['City'] . '</p>';
            echo '<p><strong>State:</strong> ' . $addressRow['State'] . '</p>';
            echo '<p><strong>Zip Code:</strong> ' . $addressRow['ZipCode'] . '</p>';
            echo '<p><strong>Country:</strong> ' . $addressRow['Contry'] . '</p>';
            echo '<p><strong>Company:</strong> ' . $addressRow['company'] . '</p>';
            echo '<p><strong>PhoneNumber:</strong> ' . $addressRow['PhoneNumber'] . '</p>';
        }
    } else {
        echo 'No address details found.';
    }
} else {
    echo 'Invalid request.';
}
?>