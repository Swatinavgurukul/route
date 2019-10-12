var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
 
// start mysql connection
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root', 
  password : '', 
  database : 'dummy_db' 
});
 
connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})
// end mysql connection
 
 
//create app server
var server = app.listen(3000,  "127.0.0.1", function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("Example app listening at http://%s:%s", host, port)
 
});

// start CRUd

app.get('/info_get', function (req, res) {
  connection.query('select * from users', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

app.get('/info_get1/:user_id', function (req, res) {
  console.log(req);
  connection.query('select * from users where user_id=?', [req.params.user_id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

app.post('/info_post', function (req, res) {
  var postData  = req.body;
  connection.query('INSERT INTO users SET ?', postData, function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

app.put('/info_put', function (req, res) {
  connection.query('UPDATE `users` SET `user_firstname`=?,`user_lastname`=?,`user_email`=? where `user_id`=?', [req.body.user_firstname,req.body.user_lastname, req.body.user_email, req.body.user_id],function (error, results, fields) {
    if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

app.delete('/user_delete', function (req, res) {
  console.log(req.body);
  connection.query('DELETE FROM `users` WHERE `user_id`=?', [req.body.user_id], function (error, results, fields) {
   if (error) throw error;
   res.end('Record has been deleted!');
 });
});
