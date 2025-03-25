<head>
    <!-- Include jQuery and Bootstrap JS -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://kit.fontawesome.com/d46cfb21c0.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/js/bootstrap.bundle.min.js"></script>
<!-- Include jQuery -->
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>

<!-- Include Bootstrap CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/css/bootstrap.min.css">
<script>
    $(document).ready(function ($) {
        
        // Number of rows to display per page
        var rowsPerPage = 5;
        var currentPage = 1;

        // Function to show/hide table rows based on the current page
        function updateTableDisplay() {
            var rows = $('#productTable tbody tr');
            var startIndex = (currentPage - 1) * rowsPerPage;
            var endIndex = startIndex + rowsPerPage;
            rows.hide();
            rows.slice(startIndex, endIndex).show();
            $('#currentPage').text(' Page ' + currentPage);
        }

        // Initialize table display
        updateTableDisplay();

        // Handle "Next" button click
        $('#nextPage').on('click', function () {
            var totalRows = $('#productTable tbody tr').length;
            var totalPages = Math.ceil(totalRows / rowsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                updateTableDisplay();
            }
        });

        // Handle "Previous" button click
        $('#prevPage').on('click', function () {
            if (currentPage > 1) {
                currentPage--;
                updateTableDisplay();
            }
        });

        // Handle dropdown toggle
        $('.dropdown-toggle').on('click', function () {
            $(this).siblings('.dropdown-menu').toggle();
        });

        // Close dropdown when clicking outside
        $(document).on('click', function (e) {
            if (!$(e.target).closest('.dropdown').length) {
                $('.dropdown-menu').hide();
            }
        });
        
        // Delegate click event for "View Order Details" button
        $(document).on('click', '.view-details-btn', function () {
            var orderId = $(this).data('order-id');
            var AddressID = $(this).data('address-id');
            var User_ID = $(this).data('user-id');
            // AJAX request to fetch order details
            $.ajax({
                url: '../_API/get_order_details.php', // Change this to the actual PHP file to handle the AJAX request
                type: 'POST',
                data: { 
                    orderId: orderId,
                    AddressID: AddressID,
                    User_ID: User_ID
                },
                success: function (data) {
                    $('#orderDetailsContent').html(data);
                    $('#orderDetailsModal').modal('show');
                },
                error: function (error) {
                    console.error('Error fetching order details:', error);
                }
            });
        });
        
        // Handle the click event for the status options
        $('.change-status-option').on('click', function () {
            var newStatus = $(this).data('status');
            var orderId = $(this).closest('tr').find('td:eq(1)').text(); // Assuming the order ID is in the second column
            // AJAX request to update the order status
            $.ajax({
                url: '../_API/update_order_status.php', // Change this to the actual PHP file to handle the AJAX request
                type: 'POST',
                data: { orderId: orderId, newStatus: newStatus },
                success: function (data) {
                    // Handle success (if needed)
                     // Manually close the dropdown
                    $('.dropdown-menu').hide();
                    alert('Order status updated successfully!');
                    showOrders();
                },
                error: function (error) {
                    console.error('Error updating order status:', error);
                     // Manually close the dropdown
                    $('.dropdown-menu').hide();
                    showOrders();
                }
            });
        });
        
    });
</script>
<style>
    .table-image {
    max-width: 50px; /* Adjust the width as needed */
    max-height: 50px; /* Adjust the height as needed */
    transition: max-width 0.5s ease-in-out, max-height 0.5s ease-in-out; /* Transition properties */
   }
    .table-image:hover {
    max-width: 150px; /* Adjust the width as needed */
    max-height: 150px; /* Adjust the height as needed */
    }
    
    .btn-primary {
    margin-bottom:30px;
    float: right;
    padding:5px;
    background-color: rgb(203, 120, 52);
    border-color: transparent;
    }
    .h2 {
        margin-bottom:-30px;
    }
    
    /* Pagination styles */
    .pagination {
        margin-top: 20px;
    }
    .pagination-button {
        cursor: pointer;
    }
    
</style>
</head>
<body>
   <div>
    <h2>All Orders</h2>
    <table class="table">
        <thead>
            <tr>
                <th class="text-center">S.N.</th>
                <th class="text-center">Order ID</th>
                <th class="text-center">Order Date</th>
                <th class="text-center">Order Status</th>
                <th class="text-center">Actions</th>
            </tr>
        </thead>
        <?php
        include_once "../config/dbconnect.php";
        $sql = "SELECT * FROM `Orders` ORDER BY `Orders`.`order_date` DESC";
        $result = $conn->query($sql);
        $count = 1;
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
        ?>
                <tr>
                    <td><?= $count ?></td>
                    <td><?= $row["order_ID"] ?></td>
                    <td><?= $row["order_date"] ?></td>
                    <td><?= $row["status"] ?></td>
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item view-details-btn" data-order-id="<?= $row["order_ID"] ?>" data-address-id="<?= $row["AddressID"] ?>" data-user-id="<?= $row["User_ID"] ?>" href="#">View Order Details</a>
                                <!-- New dropdown for changing status -->
                                 <div class="dropdown">
                                 <button class="dropdown-item dropdown-toggle" type="button" id="changeStatusDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                     Change Status
                                </button>
                                 <div class="dropdown-menu" aria-labelledby="changeStatusDropdown">
                                     <a class="dropdown-item change-status-option" data-status="confirmed" href="#">Confirmed</a>
                                     <a class="dropdown-item change-status-option" data-status="dispatched" href="#">Dispatched</a>
                                     <a class="dropdown-item change-status-option" data-status="out_for_delivery" href="#">Out for Delivery</a>
                                     <a class="dropdown-item change-status-option" data-status="delivered" href="#">Delivered</a>
                                 </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>

        <?php
                $count = $count + 1;
            }
        }
        ?>
    </table>

    <!-- Pagination controls -->
    <div class="pagination">
        <button class="btn btn-primary pagination-button" id="prevPage">Previous</button>
        <span id="currentPage">Page 1</span>
        <button class="btn btn-primary pagination-button" id="nextPage">Next</button>
    </div>
</div>
   <!-- Modal for Order Details -->
   <div class="modal fade" id="orderDetailsModal" tabindex="-1" role="dialog" aria-labelledby="orderDetailsModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document"> <!-- Add modal-lg class for larger size -->
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="orderDetailsModalLabel">Order Details</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Content for Order Details -->
                <div id="orderDetailsContent"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
</body>


