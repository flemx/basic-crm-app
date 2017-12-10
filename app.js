
var http = require('http'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    js2xmlparser = require('js2xmlparser');



var app = express();
var server = http.createServer(app);
var contactController = require('./app/controllers/contact');
var accountsController = require('./app/controllers/account');


var viewPath = path.join(__dirname, 'app/views');
app.set('views', viewPath);

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





//Fire controllers
contactController(app,fs,bodyParser,js2xmlparser);
accountsController(app,fs,bodyParser,js2xmlparser);







server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});

