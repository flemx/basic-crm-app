var http = require('http'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    js2xmlparser = require('js2xmlparser'),
    libxslt = require('libxslt'),
    urlencodedParser = bodyParser.urlencoded({extended: false});

var app = express();
var server = http.createServer(app);
//var urlencodedParser = bodyParser.urlencoded({extended: false});
var customerController = require('./controllers/contact');
var gamesController = require('./controllers/Games');

//set up template egine
app.set('view engine', 'ejs');

//static files
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());




// GET request to dislay index.html located inside /views folder
app.get('/', function(req, res) {
  res.render('index');
});

//Test router Boris
app.get('/boris', function(req, res) {
  res.render('borisTest');
});

  

//Fire controllers
customerController(app,fs,bodyParser);
gamesController(app,fs,js2xmlparser,libxslt,bodyParser);



server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});




