<?php
// This is not the production code, variables and names are hidden for security. This is just a sample of the database bridge.
header("Access-Control-Allow-Origin: *");
if (/* Check if variables are set */) {
    $mysqli = new mysqli(/* MySQL login info */);
    if ($mysqli->connect_errno) {
        echo "Error";
        die();
    }

    $id = /* Get id variable */;
    $coat = /* Get coat variable */;
    $jacket = /* Get jacket variable */;
    $sweater = /* Get sweater variable */;

    if (!($res = $mysqli->query("SELECT * FROM `/* Table name */` WHERE `id`='$id'"))) {
        echo "Error";
        die();
    }

    if ($res->num_rows == 0) {
        $mysqli->query("INSERT INTO `/* Table name */`(`id`, `coat`, `jacket`, `sweater`) VALUES ('$id', $coat, $jacket, $sweater)");
    } else {
        $mysqli->query("UPDATE `/* Table name */` SET `coat`=$coat, `jacket`=$jacket, `sweater`=$sweater WHERE `id`='$id'");
    }
    echo $coat;
    echo ";";
    echo $jacket;
    echo ";";
    echo $sweater;
    die();
} else if (/* Check if variables are set */) {
    $mysqli = new mysqli(/* MySQL login info */);
    if ($mysqli->connect_errno) {
        echo "Error";
        die();
    }

    $id = $_GET['id'];

    if (!($res = $mysqli->query("SELECT * FROM `/* Table name */` WHERE `id`='$id'"))) {
        echo "Error";
        die();
    }

    for ($row_no = ($res->num_rows - 1); $row_no >= 0; $row_no--) {
        $res->data_seek($row_no);
        $info = $res->fetch_assoc();

        echo $info['coat'];
        echo ";";
        echo $info['jacket'];
        echo ";";
        echo $info['sweater'];
        die();
    }
}
echo "Error";
die();
?>