<?php
if (isset($_POST["upload"])) {
    $uploadDirectory = "uploads/"; // The directory where uploaded files will be stored

    if (!file_exists($uploadDirectory)) {
        mkdir($uploadDirectory, 0777, true); // Create the directory if it doesn't exist
    }

    $uploadedFile = $_FILES["file"];

    if ($uploadedFile["error"] === UPLOAD_ERR_OK) {
        $fileExtension = pathinfo($uploadedFile["name"], PATHINFO_EXTENSION);
        $newFileName = uniqid() . "." . $fileExtension;
        $destination = $uploadDirectory . $newFileName;

        if (move_uploaded_file($uploadedFile["tmp_name"], $destination)) {
            echo "File uploaded successfully: " . $newFileName;
        } else {
            echo "File upload failed.";
        }
    } else {
        echo "Error: " . $uploadedFile["error"];
    }
}
?>
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $uploadDirectory = 'public/file/';
    if (!file_exists($uploadDirectory)) {
        mkdir($uploadDirectory, 0777, true);
    }

    $file = $_FILES['file'];

    if ($file['error'] === UPLOAD_ERR_OK) {
        $newFileName = makeid(6) . '.' . pathinfo($file['name'], PATHINFO_EXTENSION);
        $destination = $uploadDirectory . $newFileName;

        if (move_uploaded_file($file['tmp_name'], $destination)) {
            header('Location: index.html?status=success');
            exit();
        } else {
            header('Location: index.html?status=error');
            exit();
        }
    } else {
        header('Location: index.html?status=error');
        exit();
    }
} else {
    header('Location: index.html?status=error');
    exit();
}

function makeid($length) {
    $result = '';
    $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    $charactersLength = strlen($characters);
    for ($i = 0; $i < $length; $i++) {
        $result .= $characters[rand(0, $charactersLength - 1)];
    }
    return $result;
}
