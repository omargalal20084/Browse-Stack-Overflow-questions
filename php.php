<?php
//header('Content-type: application/xml');
//This page is used because of the Cross-Origin Resource Sharing policy (CORS)
//This page takes the http requests from the javascript and make the request then return the result to the javascript
$c = $_GET['url'];
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $c);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");


$headers = array();
$headers[] = "Accept: application/json";
$headers[] = "Authorization: Bearer APIKEY";
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
curl_close ($ch);
echo $result;
?>