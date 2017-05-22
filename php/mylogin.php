<?php
/**
 * Created by PhpStorm.
 * User: yyl
 * Date: 2017/3/19
 * Time: 13:23
 */

$username=$_REQUEST['username'];
$password=$_REQUEST['password'];

$conn = new mysqli("localhost","root","","mysqol_login",3306);
$sql="select * from login WHERE username='$username' AND password='$password'";

$res=$conn->query($sql);

$arr=mysqli_fetch_array($res);

if($arr){
    $tmp=array("code"=>1,"mes"=>"登录成功，正在跳转至首页...","id"=>$arr['id'],"username"=>$arr['username']);
    echo json_encode($tmp);
}else{
    $tmp=array("code"=>0,"mes"=>"用户名或密码错误");
    echo  json_encode($tmp);
}