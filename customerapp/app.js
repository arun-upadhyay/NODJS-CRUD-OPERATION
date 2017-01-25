var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var upload = multer(); 
var app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(upload.array()); // for parsing multipart/form-data
// working with session
var expressSession = require('express-session');
var cookieParser = require('cookie-parser'); // the session is stored in a cookie, so we use this to parse it
// must use cookieParser before expressSession
app.use(cookieParser());
app.use(expressSession({secret:'jkhjjjk787hjj'}));

app.use(express.static('public'));

// add product controller
app.use(require('./product-controller'));

// Server connection
var port = process.env.PORT || 8088;
var server = app.listen(port, function () {
var host = server.address().address
var port = server.address().port

console.log("Example app listening at http://%s:%s", host, port)
})