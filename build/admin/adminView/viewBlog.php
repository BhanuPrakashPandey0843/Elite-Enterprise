<?php
include_once "../config/dbconnect.php";

// Handle SQL execution requests
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['sql'])) {
    $sql = $_POST['sql'];

    // Execute the SQL query
    $result = $conn->query($sql);

    // Check if query execution was successful
    if ($result === TRUE) {
        $response = array("success" => true);
    } else {
        $response = array("success" => false, "error" => $conn->error);
    }

    // Send JSON response
    echo json_encode($response);
}
?>


<!DOCTYPE html>
<html>
<head>
    <script src="https://kit.fontawesome.com/d46cfb21c0.js" crossorigin="anonymous"></script>
    <title>Manage Blogs</title>
    <style>
        .table-image {
            max-width: 50px;
            max-height: 50px;
            transition: max-width 0.5s ease-in-out, max-height 0.5s ease-in-out;
        }

        .table-image:hover {
            max-width: 150px;
            max-height: 150px;
        }
        
        /*//////////*/
        
        .btn-primary {
            margin-bottom:30px;
            float: right;
            padding:5px;
            background-color: rgb(203, 120, 52);
            border-color: transparent;
        }
    
    
        /*//////////*/
        .action-buttons {
        display: flex;
        justify-content: center;
        }

        .action-buttons button {
        margin: 0 5px;
        }
    </style>
</head>
<body>
    <div class="container">
    <h2>All Blogs</h2>
    <button class="btn-primary" data-toggle="modal" data-target="#addModal">Add Blog</button>

    <table class="table table-striped">
        <thead>
            <tr>
                <th class="text-center">S.N.</th>
                <th class="text-center">Date</th>
                <th class="text-center">Author</th>
                <th class="text-center">Title</th>
                <th class="text-center">Caption</th>
                <th class="text-center">Image</th>
                <th class="text-center">Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php
            include_once "../config/dbconnect.php";
            $sql = "SELECT `Blog_id`, `date`, `cname`, `caption1`, `caption2`, `img` FROM `Blogs`";
            $result = $conn->query($sql);
            $count = 1;
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    ?>
                    <tr>
                        <td><?= $count ?></td>
                        <td><?= $row["date"] ?></td>
                        <td><?= $row["cname"] ?></td>
                        <td><?= $row["caption1"] ?></td>
                        <td><?= $row["caption2"] ?></td>
                        <td><img class="table-image" src="<?= $row["img"] ?>" alt="Image"></td>
                        <td class="action-buttons">
                            <button class="btn btn-primary edit-btn" onclick="showEditModal('<?= $row["Blog_id"] ?>', '<?= $row["date"] ?>', '<?= $row["cname"] ?>', '<?= $row["caption1"] ?>', '<?= $row["caption2"] ?>', '<?= $row["img"] ?>')">Edit</button>
                            <button class="btn btn-danger delete-btn" onclick="deleteEntry('<?= $row["Blog_id"] ?>')">Delete</button>    
                        </td>
                            
                    </tr>
                    <?php
                    $count++;
                }
            }
            ?>
        </tbody>
    </table>
    </div>

    <!-- Add Modal -->
    <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                                        <style>
                        /* Overall container style */
                        .editor-container {
                            font-family: Arial, sans-serif;
                            border: 1px solid #ccc;
                            border-radius: 5px;
                            padding: 10px;
                            margin-bottom: 20px;
                        }
                
                        /* Button style */
                        .editor-container button {
                            background-color: #f8f9fa;
                            border: 1px solid #dee2e6;
                            color: #495057;
                            padding: 8px 12px;
                            margin-right: 5px;
                            border-radius: 4px;
                            cursor: pointer;
                            transition: background-color 0.3s ease;
                        }
                
                        /* Button hover style */
                        .editor-container button:hover {
                            background-color: #e9ecef;
                        }
                
                        /* Editor style */
                        .editor {
                            border: 1px solid #ced4da;
                            border-radius: 5px;
                            padding: 10px;
                            min-height: 200px;
                            font-size: 16px;
                            line-height: 1.6;
                        }
                    </style>
                    <h5 class="modal-title" id="addModalLabel">Add Blog</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="addForm">
                        <div class="form-group">
                            <label for="dateInput">Date:</label>
                            <input type="date" class="form-control" id="dateInput" name="date" required>
                        </div>
                        <div class="form-group">
                            <label for="cnameInput">Author:</label>
                            <input type="text" class="form-control" id="cnameInput" name="cname" required>
                        </div>
                        <div class="form-group">
                            <label for="caption1Input">Title:</label>
                            <input type="text" class="form-control" id="caption1Input" name="caption1" required>
                        </div>
                        <div class="form-group">
                            <label for="caption2Input">Caption:</label>
                            <div class="editor-container">
                            <button onclick="formatText('bold')"><i class="fas fa-bold"></i></button>
                            <button onclick="formatText('italic')"><i class="fas fa-italic"></i></button>
                            <button onclick="formatText('underline')"><i class="fas fa-underline"></i></button>
                            <button onclick="formatText('strikethrough')"><i class="fas fa-strikethrough"></i></button>
                            <button onclick="formatText('justifyLeft')"><i class="fas fa-align-left"></i></button>
                            <button onclick="formatText('justifyCenter')"><i class="fas fa-align-center"></i></button>
                            <button onclick="formatText('justifyRight')"><i class="fas fa-align-right"></i></button>
                            <button onclick="formatText('justifyFull')"><i class="fas fa-align-justify"></i></button>
                            <button onclick="formatText('insertOrderedList')"><i class="fas fa-list-ol"></i></button>
                            <button onclick="formatText('insertUnorderedList')"><i class="fas fa-list-ul"></i></button>
                            <button onclick="formatText('indent')"><i class="fas fa-indent"></i></button>
                            <button onclick="formatText('outdent')"><i class="fas fa-outdent"></i></button>
                        </div>

                        <div class="editor" id="productLongDescription" name="Product_Description_long" contenteditable="true" data-validetta="required" onfocus="clearPlaceholder()">Caption....</div>
                        </div>
                        <div class="form-group">
                            <label for="imgInput">Image:</label>
                            <input type="file" class="form-control-file" id="imgInput" name="img" accept="image/*" required onchange="previewImage(event)">
                            <img id="imgPreview" src="#" alt="Image Preview" style="max-width: 200px; display: none;">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="addBlog()" id="addBlogBtn" >Add</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Edit Modal -->
    <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editModalLabel">Edit Blog</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="editForm">
                <input type="hidden" id="editBlogId" name="blogId">

                <label for="editDateInput">Date:</label>
                <input type="date" id="editDateInput" name="date" required>

                <label for="editCnameInput">Author:</label>
                <input type="text" id="editCnameInput" name="cname" required>

                <label for="editCaption1Input">Title:</label>
                <input type="text" id="editCaption1Input" name="caption1" required>

                <label for="editCaption2Input">Caption:</label>
                <input type="text" id="editCaption2Input" name="caption2" required>

                <label for="editImgInput">Image:</label>
                <input type="file" id="editImgInput" name="img" accept="image/*">

                <button type="submit">Save</button>
            </form>
        </div>
    </div>
    
    <script>
    function showAddModal() {
        document.getElementById("addModal").style.display = "block";
    }

    function showEditModal(blogId, date, cname, caption1, caption2, img) {
        document.getElementById("editModal").style.display = "block";
        document.getElementById("editBlogId").value = blogId;
        document.getElementById("editDateInput").value = date;
        document.getElementById("editCnameInput").value = cname;
        document.getElementById("editCaption1Input").value = caption1;
        document.getElementById("editCaption2Input").value = caption2;
        document.getElementById("editImgInput").value = img;
    }

    function closeModal(modalId) {
        document.getElementById(modalId).style.display = "none";
    }

    function deleteEntry(blogId) {
        // Implement the DELETE SQL statement to remove the entry
        const sql = `DELETE FROM Blogs WHERE Blog_id = '${blogId}'`;
        executeSql(sql, function() {
            // Refresh the page after successful deletion
            location.reload();
        });
    }
    
    function previewImage(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function() {
                const imgPreview = document.getElementById('imgPreview');
                imgPreview.src = reader.result;
                imgPreview.style.display = 'block';
            }
            reader.readAsDataURL(file);
        }
    }
    
    function addBlog() {
        event.preventDefault();
    
        // Get form values
        const formData = new FormData(document.getElementById("addForm"));
        const date = formData.get('date');
        const cname = formData.get('cname');
        const caption1 = formData.get('caption1');
        const caption2 = formData.get('caption2');
        const img = formData.get('img');
    
        // Make an AJAX request to the API
        $.ajax({
            url: "https://theeliteenterprise.in/_API/BlogsPost.php",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                if (response.status) {
                    alert(response.message);
                    location.reload();
                    document.getElementById("addBlogBtn").disabled = false;
                } else {
                    console.error("API error:", response.message);
                    document.getElementById("addBlogBtn").disabled = false;
                }
            },
            error: function(xhr, status, error) {
                console.error("AJAX request error:", error);
            }
        });
    
        // Reset the form
        document.getElementById("addForm").reset();
        closeModal("addModal");
    
        // Disable the "Add" button
        document.getElementById("addBlogBtn").disabled = true;
    }

    document.getElementById("editForm").addEventListener("submit", function(event) {
        event.preventDefault();

        // Get form values
        const formData = new FormData(event.target);
        const blogId = formData.get('blogId');
        const date = formData.get('date');
        const cname = formData.get('cname');
        const caption1 = formData.get('caption1');
        const caption2 = formData.get('caption2');
        const img = formData.get('img');

        // Implement the UPDATE SQL statement to edit the entry
        const sql = `UPDATE Blogs SET date='${date}', cname='${cname}', caption1='${caption1}', caption2='${caption2}', img='${img}' WHERE Blog_id = '${blogId}'`;
        executeSql(sql, function() {
            // Refresh the page after successful update
            location.reload();
        });

        closeModal("editModal");
    });

    function executeSql(sql, callback) {
            $.ajax({
                url: "https://theeliteenterprise.in/admin/adminView/viewBlog.php",
                type: "POST",
                data: { sql: sql },
                success: function(response) {
                    if (response.success) {
                        callback();
                        location.reload();
                    } else {
                        callback();
                        location.reload();
                        console.error("SQL execution error:", response.error);
                    }
                },
                error: function(xhr, status, error) {
                    console.error("AJAX request error:", error);
                }
            });
        }
</script>

<script>
        function formatText(command) {
            event.preventDefault();
            document.execCommand(command);
        }
        function clearPlaceholder() {
        var editor = document.getElementById('productLongDescription');
            if (editor.innerHTML.trim() === 'This Product Contains....') {
                editor.innerHTML = '';
            }
        }
</script>
    
</body>
</html>