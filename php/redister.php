<?php
/**
 * Created by PhpStorm.
 * User: yyl
 * Date: 2017/3/20
 * Time: 16:46
 */

$username=$_REQUEST['username'];
$password=$_REQUEST['password'];
$phonenumber=$_REQUEST['phonenumber'];

$conn = new mysqli("localhost","root","","mysqol_login",3306);
$selectRegSql = "select * from login WHERE username='$username'";
$res1 = $conn->query($selectRegSql);
$res1arr = mysqli_fetch_array($res1);

if($res1arr){
    $arr1=array("code"=>0,"mes"=>"该用户名已被注册!!!");
    echo json_encode($arr1);
}else{
    $regsql="insert into login(username,password,phonenumber) values ('$username','$password', '$phonenumber')";

    $res = $conn->query($regsql);

    if($res){
        $arr=array("code"=>1,"mes"=>"注册成功");
        echo json_encode($arr);
    }else{
        $arr=array("code"=>0,"mes"=>"注册失败");
        echo json_encode($arr);
    }
}
