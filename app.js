var http = require('http'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    js2xmlparser = require('js2xmlparser'),
    libxslt = require('libxslt');

var app = express();
var server = http.createServer(app);
var customerController = require('./controllers/Customer');
var gamesController = require('./controllers/Games');

app.use(express.static(path.resolve(__dirname, 'views')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());




//Fire controllers
customerController(app,fs,js2xmlparser,libxslt,bodyParser);
gamesController(app,fs,js2xmlparser,libxslt,bodyParser);

// GET request to dislay index.html located inside /views folder
app.get('/', function(req, res) {
  res.render('index');
});














server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});