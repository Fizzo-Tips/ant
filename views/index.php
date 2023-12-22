<!DOCTYPE html>
<html>
<head>
    <title>File Upload</title>
</head>
<body>
    <h1>File Upload</h1>
    <form action="upload.php" method="POST" enctype="multipart/form-data">
        <input type="file" name="file">
        <button type="submit" name="upload">Upload</button>
    </form>

    <?php
    if (isset($_GET['status'])) {
        if ($_GET['status'] == 'success') {
            echo '<p>File uploaded successfully.</p>';
        } elseif ($_GET['status'] == 'error') {
            echo '<p>File upload failed.</p>';
        }
    }
    ?>
</body>
</html>
