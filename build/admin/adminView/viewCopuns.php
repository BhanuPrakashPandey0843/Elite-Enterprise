<head>
<script>
$(document).ready(function($) {
     // Handle the search input field
    $('#searchProduct').on('keyup', function() {
        var searchText = $(this).val().toLowerCase();
        $('#productTable tbody tr').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(searchText) > -1);
        });
    });
 // Number of rows to display per page
    var rowsPerPage = 5;
    var currentPage = 1;

    // Function to show/hide table rows based on current page
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
    $('#nextPage').on('click', function() {
        var totalRows = $('#productTable tbody tr').length;
        var totalPages = Math.ceil(totalRows / rowsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            updateTableDisplay();
        }
    });

    // Handle "Previous" button click
    $('#prevPage').on('click', function() {
        if (currentPage > 1) {
            currentPage--;
            updateTableDisplay();
        }
    });
    
        // Handle the form submission for adding coupons
    $('#addCouponForm').submit(function (e) {
        e.preventDefault();
        var formData = new FormData(this);

        $.ajax({
            url: '../_API/Add_coupon_api.php', // Replace with your PHP endpoint to handle the API call for adding coupons
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                // Handle the response from the API call
                console.log(response);
                if (response.Status == true) {
                    // Display a browser alert with the success message
                    alert(response);
                    setTimeout(function () {
                        // Reload the page or update the coupon list
                        $('#addCouponModal').hide();
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        showCopuns();
                    }, 1000);

                } else {
                    // Display a browser alert with an error message if needed
                        $('#addCouponModal').hide();
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        showCopuns();
                    alert(response);
                }
                $('#addCouponModal').modal('hide'); // Close the modal
            }
        });
    });
    
    
});
</script>
</head>

<div>
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
<!-- Add Coupons button -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addCouponModal">Add Coupons</button>

<h2>All Coupons</h2>
<table class="table">
    <thead>
        <tr>
            <th class="text-center">S.N.</th>
            <th class="text-center">Coupon ID</th>
            <th class="text-center">Coupon Code</th>
            <th class="text-center">Discount Percent</th>
        </tr>
    </thead>
    <?php
    include_once "../config/dbconnect.php";
    $sql = "SELECT * FROM `Copuns`"; // Assuming the table name is Coupons
    $result = $conn->query($sql);
    $count = 1;
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
    ?>
            <tr>
                <td><?= $count ?></td>
                <td><?= $row["Copun_ID"] ?></td>
                <td><?= $row["CopunCode"] ?></td>
                <td><?= $row["DiscountPercent"] ?></td>
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

<!-- Modal for adding coupons -->
<div class="modal fade" id="addCouponModal" tabindex="-1" role="dialog" aria-labelledby="addCouponModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addCouponModalLabel">Add Coupon</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Form for adding a coupon -->
                <form id="addCouponForm">
                    <!-- Add input fields for coupon details here -->
                    <div class="form-group">
                        <label for="couponCode">Coupon Code</label>
                        <input type="text" class="form-control" id="couponCode" name="CouponCode">
                    </div>
                    <div class="form-group">
                        <label for="discountPercent">Discount Percent</label>
                        <input type="text" class="form-control" id="discountPercent" name="DiscountPercent">
                    </div>
                    <!-- Add more input fields for other coupon details here -->
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Add Coupon</button>
                </form>
            </div>
        </div>
    </div>
</div>
