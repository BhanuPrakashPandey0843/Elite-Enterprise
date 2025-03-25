
<!-- Bootstrap CSS -->

<style>
    .table-image {
    max-width: 50px; /* Adjust the width as needed */
    max-height: 50px; /* Adjust the height as needed */
    transition: max-width 0.5s ease-in-out, max-height 0.5s ease-in-out; /* Transition properties */
   }
   
    .table-image:hover {
    max-width: 150px; /* Adjust the width as needed */
    max-height: 150px; /* Adjust the height as needed */
    filter: drop-shadow(5px 2px 1px #999999);
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

<script>
function hideSubBrandsModal() {
  $('#addSubBrandstModal').modal('hide'); // Close the modal
}
hideSubBrandsModal();

$(document).ready(function($) {
    
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
    
     // Handle the form submission
    $('#addSubBrandsForm').submit(function(e) {
        e.preventDefault();
        var formData = new FormData(this);
        $.ajax({
            url: '../_API/add_Subbrands.php', // Replace with your PHP endpoint to handle the API call
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                // Handle the response from the API call
                console.log(response);
                 if (response.Status == true) {
                // Display a browser alert with the success message
                alert(response);
                setTimeout(function(){
                    showSubBrands();
                }, 1000);
                hideSubBrandsModal();
                
                } else {
                    // Display a browser alert with an error message if needed
                    setTimeout(function(){
                    showSubBrands();
                }, 1000);
                hideSubBrandsModal();
                }
                $('#addSubBrandstModal').modal('hide'); // Close the modal
                 setTimeout(function(){
                    showSubBrands();
                }, 1000);
                hideSubBrandsModal();
            }
        });
    });
});

// Function to open the modify SubBrand modal
    function modifySubBrandModal(subBrandId) {
        // Fetch SubBrand details based on subBrandId and populate the modal
        // Here you can use AJAX to fetch details from the server and populate the modal fields

        // For now, let's assume you have fetched details and set them to variables
        var subBrandName = "SubBrandName"; // Replace with actual value
        var connectedToBrandId = 1; // Replace with actual value

        // Set the modal values
        $("#SubBrand_Name").val(subBrandName);
        $("#ConnectedToBrand_id").val(connectedToBrandId);

        // Show the modal
        $('#modifySubBrandModal').modal('show');
    }

    // Function to handle modification of SubBrand
    function modifySubBrand(subBrandId) {
        var subBrandName = $("#SubBrand_Name").val();
        var connectedToBrandId = $("#ConnectedToBrand_id").val();

        // Perform the modification using AJAX
        $.ajax({
            url: '../_API/modify_Subbrand.php', // Replace with your PHP endpoint to handle the API call
            type: 'POST',
            data: {
                Subcat_id: subBrandId,
                SubBrand_Name: subBrandName,
                ConnectedToBrand_id: connectedToBrandId
            },
            success: function(response) {
                // Handle the response from the API call
                console.log(response);
                // Close the modal and update the table if needed
                $('#modifySubBrandModal').modal('hide');
                showSubBrands(); // Assuming you have a function to refresh the table
            }
        });
    }

// Function to handle deletion of SubBrand
function deleteSubBrand(subBrandId) {
    // Perform the deletion using AJAX
    $.ajax({
        url: '../_API/delete_Subbrand.php', // Replace with your PHP endpoint to handle the API call
        type: 'POST',
        data: {
            Subcat_id: subBrandId
        },
        success: function(response) {
            // Handle the response from the API call
            console.log(response);
            // Update the table if needed
            showSubBrands(); // Assuming you have a function to refresh the table
        }
    });
}
</script>

<div>
  <h2>All SubBrands</h2>
  <button id="addSubBrandsBtn" data-toggle="modal" data-target="#addSubBrandstModal" class="btn btn-primary">Add SubBrand</button>
  <table class="table">
    <thead>
        <tr>
            <th class="text-center">S.N.</th>
            <th class="text-center">SubBrand Name</th>
            <th class="text-center">Connected To Brand</th>
            <th class="text-center">Actions</th> <!-- New column for actions -->
        </tr>
    </thead>
    <?php
      include_once "../config/dbconnect.php";
      $sql="SELECT Brands_Subcat.Subcat_id , Brands_Subcat.Subcat_Name , Brands_Subcat.ConnectedToBrand_id , Brands.Brand_Name FROM Brands_Subcat 
            JOIN Brands ON Brands_Subcat.ConnectedToBrand_id = Brands.Brand_id";
      $result=$conn-> query($sql);
      $count=1;
      if ($result-> num_rows > 0){
        while ($row=$result-> fetch_assoc()) {
           
    ?>
    <tr>
        <td><?=$count?></td>
        <td><?=$row["Subcat_Name"]?></td>
        <td><?= $row["Brand_Name"] ?></td>
        <td>
            <!-- Actions dropdown for each row -->
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="actionsDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Actions
                </button>
                <div class="dropdown-menu" aria-labelledby="actionsDropdown">
                    <a class="dropdown-item" href="adminView/edit_subcat.php?Subcat_id=<?= $row['Subcat_id'] ?>">Modify</a>
                    <a class="dropdown-item" href="#" onclick="deleteSubBrand(<?=$row["Subcat_id"]?>)">Delete</a>
                </div>
            </div>
        </td>
    </tr>
    <?php
        $count=$count+1;
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
<!-- Modal for adding products -->
<div class="modal fade" id="addSubBrandstModal" tabindex="-1" role="dialog" aria-labelledby="addSubBrandstModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addSubBrandstModalLabel">Add Brand</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Form for adding a SubBrand -->
                <form id="addSubBrandsForm">
                    <div class="form-group">
                        <label for="Subcat_Name">SubBrand Name</label>
                        <input type="text" class="form-control" id="Subcat_Name" name="Subcat_Name">
                    </div>
                    <div class="form-group">
                        <label for="ConnectedToBrand_id">Connect To Brand</label>
                        <select class="form-control" id="ConnectedToBrand_id" name="ConnectedToBrand_id">
                            <?php
                                // Fetch and display brands in the dropdown
                                $brandSql = "SELECT Brand_id, Brand_Name FROM Brands";
                                $brandResult = $conn->query($brandSql);
                                if ($brandResult->num_rows > 0) {
                                    while ($brandRow = $brandResult->fetch_assoc()) {
                                        echo "<option value='{$brandRow["Brand_id"]}'>{$brandRow["Brand_Name"]}</option>";
                                    }
                                }
                            ?>
                        </select>
                        </div>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary">Add</button>
                </form>
            </div>
        </div>
    </div>
</div>
