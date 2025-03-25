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
    
        // Handle the form submission for adding ZipCodes
    $('#addZipCodeForm').submit(function (e) {
        e.preventDefault();
        var formData = new FormData(this);

        $.ajax({
            url: '../_API/Add_ZipCode_api.php', // Replace with your PHP endpoint to handle the API call for adding ZipCodes
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
                        // Reload the page or update the ZipCode list
                        $('#addZipCodeModal').hide();
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        showAvalableZipCodes();
                    }, 1000);

                } else {
                    // Display a browser alert with an error message if needed
                        $('#addZipCodeModal').hide();
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        showAvalableZipCodes();
                    alert(response);
                }
                $('#addZipCodeModal').modal('hide'); // Close the modal
            }
        });
    });
    
     // Function to handle deletion of ZipCode
        window.deleteZipCode = function (zipCodeID) {
            // Perform the deletion using AJAX
            $.ajax({
                url: '../_API/delete_ZipCode.php', // Replace with your PHP endpoint to handle the API call
                type: 'POST',
                data: {
                    ZipCodeID: zipCodeID
                },
                success: function (response) {
                    // Handle the response from the API call
                    console.log(response);
                    // Update the table if needed
                    showAvalableZipCodes(); // Assuming you have a function to refresh the table
                }
            });
        }
    
    
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

<!-- Add ZipCodes button -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addZipCodeModal">Add ZipCodes</button>
<h2>All ZipCodes</h2>
<table class="table">
    <thead>
        <tr>
            <th class="text-center">S.N.</th>
            <th class="text-center">Zip Code</th>
            <th class="text-center">Estimated Days</th>
            <th class="text-center">Actions</th> <!-- New column for actions -->
        </tr>
    </thead>
    <?php
    include_once "../config/dbconnect.php";
    $sql = "SELECT * FROM `AvalableZipCodes`"; // Assuming the table name is ZipCodes
    $result = $conn->query($sql);
    $count = 1;
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
    ?>
            <tr>
                <td><?= $count ?></td>
                <td><?= $row["ZipCode"] ?></td>
                <td><?= $row["estimated_Days"] ?></td>
                <td class="table-actions">
                    <!-- Actions dropdown for each row -->
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="actionsDropdown<?= $count ?>" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Actions
                        </button>
                        <div class="dropdown-menu" aria-labelledby="actionsDropdown<?= $count ?>">
                            <a class="dropdown-item" href="#" onclick="deleteZipCode(<?= $row["ZipCodeID"] ?>)">Delete</a>
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
    <span id="currentPage"> Page 1 </span>
    <button class="btn btn-primary pagination-button" id="nextPage">Next</button>
</div>
</div>
<!-- Modal for adding ZipCodes -->
<div class="modal fade" id="addZipCodeModal" tabindex="-1" role="dialog" aria-labelledby="addZipCodeModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addZipCodeModalLabel">Add ZipCode</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Form for adding a ZipCode -->
                <form id="addZipCodeForm">
                    <!-- Add input fields for ZipCode details here -->
                    <div class="form-group">
                        <label for="ZipCode">ZipCode</label>
                        <input type="text" class="form-control" id="ZipCode" name="ZipCode">
                    </div>
                    <div class="form-group">
                        <label for="EstimatedDays">Estimated Days</label>
                        <input type="text" class="form-control" id="EstimatedDays" name="EstimatedDays">
                    </div>
                    <!-- Add more input fields for other ZipCode details here -->
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Add ZipCode</button>
                </form>
            </div>
        </div>
    </div>
</div>