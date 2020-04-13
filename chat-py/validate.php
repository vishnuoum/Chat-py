<?php
    require 'connect.php';
    $phone=$_POST["phone"];
    $pass=$_POST["password"];
    $sql="SELECT id FROM user WHERE phone='$phone' AND password='$pass'";
    $result=$conn->query($sql);
    if($result->num_rows>0){
        echo "success";
        setcookie('phone', $phone, time() + (86400 * 30*1000), "/");
        header("Location: http://192.168.42.229:5000");
    }
    else{
        echo $conn->error;
        echo "Wrong password or username!!!";
    }
    $conn->close();
?>