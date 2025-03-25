<head>
    <!-- Include jQuery and Bootstrap JS -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://kit.fontawesome.com/d46cfb21c0.js" crossorigin="anonymous"></script>
<script>
$(document).ready(function($) {
    
        // Handle the form submission for adding BannerImages
    $('#addBannerImageForm').submit(function (e) {
        e.preventDefault();
        var formData = new FormData(this);

        $.ajax({
            url: '../_API/Add_BannerImage_api.php', // Replace with your PHP endpoint to handle the API call for adding BannerImages
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
                        // Reload the page or update the BannerImage list
                        $('#addBannerImageModal').hide();
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        showAvalableBanners();
                    }, 1000);

                } else {
                    // Display a browser alert with an error message if needed
                        $('#addBannerImageModal').hide();
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        showAvalableBanners();
                    alert(response);
                }
                $('#addBannerImageModal').modal('hide'); // Close the modal
            }
        });
    });
    
     // Function to handle deletion of BannerImage
        window.deleteBannerImage = function (BannerID) {
            // Perform the deletion using AJAX
            $.ajax({
                url: '../_API/delete_BannerImage.php', // Replace with your PHP endpoint to handle the API call
                type: 'POST',
                data: {
                    BannerID: BannerID
                },
                success: function (response) {
                    // Handle the response from the API call
                    console.log(response);
                    // Update the table if needed
                    showAvalableBanners(); // Assuming you have a function to refresh the table
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
    .img {
        height:80px;
        width:150px;
    }
    
</style>

<!-- Add BannerImages button -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addBannerImageModal">Add Image</button>
<h2>All BannerImages</h2>
<table class="table">
    <thead>
        <tr>
            <th class="text-center">S.N.</th>
            <th class="text-center">Caption</th>
            <th class="text-center">Content</th>
            <th class="text-center">Image</th>
            <th class="text-center">Actions</th> <!-- New column for actions -->
        </tr>
    </thead>
    <?php
    include_once "../config/dbconnect.php";
    $sql = "SELECT * FROM `Home_Slider_Images` "; // Assuming the table name is BannerImages
    $result = $conn->query($sql);
    $count = 1;
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
    ?>
            <tr>
                <td><?= $count ?></td>
                <td><?= $row["caption"] ?></td>
                <td><?= $row["content"] ?></td>
                <td><img class="img" src="<?= $row["url"] ?>" alt="Image"></td>
                <td class="table-actions">
                    <!-- Actions dropdown for each row -->
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="actionsDropdown<?= $count ?>" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Actions
                        </button>
                        <div class="dropdown-menu" aria-labelledby="actionsDropdown<?= $count ?>">
                            <a class="dropdown-item" href="#" onclick="deleteBannerImage(<?= $row["Home_Slider_Image_ID"] ?>)">Delete</a>
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
</div>
<!-- Modal for adding BannerImages -->
<div class="modal fade" id="addBannerImageModal" tabindex="-1" role="dialog" aria-labelledby="addBannerImageModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addBannerImageModalLabel">Add BannerImage</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Form for adding a BannerImage -->
                <form id="addBannerImageForm">
                    <!-- Add input fields for BannerImage details here -->
                    <div class="form-group">
                        <label for="Caption">Image Caption</label>
                        <input type="text" class="form-control" id="Caption" name="Caption">
                    </div>
                    <div class="form-group">
                        <label for="Content">Image Content</label>
                        <input type="text" class="form-control" id="Content" name="Content">
                    </div>
                    <div class="form-group">
                        <label for="Image">Banner Image</label>
                        <input type="file" class="form-control" id="Image" name="Image" accept="image/*">
                    </div>
                    <!-- Add more input fields for other BannerImage details here -->
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Add BannerImage</button>
                </form>
            </div>
        </div>
    </div>
</div>