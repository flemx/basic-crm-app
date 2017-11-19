module.exports = function(app,fs,bodyParser){
var contactData = require('../models/contacts.js');
myContacts = new contactData(fs);

  
  
 //Render contact.ejs when opening /contacts URL
app.get('/contacts', function(req, res) {
  console.log("Controller router '/contacts' is executing ");
  res.render('contacts');
});
  
 
//Router to send contacts JSON object when called
 app.get('/get/contacts', function(req, res) {
   var data = myContacts.getContacts();
   console.log("Controller router '/get/contacts' is executing ");
   res.send(data);
});
  

 // Post router to add new record to contacts.json 
 app.post('/post/contact', function(req, res){
    var data = myContacts.getContacts();
    data.contact.push(req.body);
    myContacts.setContacts(data);
    console.log("Controller router '/post/contacts' is executing ");
    res.send(data);
  }); 


  
  
 
 /*
// Contact routers using XML parsing and returning data through table
  
//Customer get app
app.get('/get/contacts', function(req, res) {
    
  console.log("Routing works");
    res.writeHead(200, { 'Content-Type': 'text/html' });
    
    var docSource = fs.readFileSync('./data/contacts.xml', 'utf8');
    var stylesheetSource = fs.readFileSync('./models/contact.xsl', 'utf8');
    console.log("Reading files");  
  
    var doc = libxslt.libxmljs.parseXml(docSource);
    var stylesheet = libxslt.parse(stylesheetSource);
    
    var result = stylesheet.apply(doc);
    
  console.log("Reading customers success");
    res.end(result.toString());
  
});


//Customer post app
app.post('/post/contact', function(req, res) {

  // Function to read in a JSON file, add to it & convert to XML
  function appendJSON(obj) {

    // Read in a JSON file
    var JSONfile = fs.readFileSync('./data/contacts.json', 'utf8');

    // Parse the JSON file in order to be able to edit it 
    var JSONparsed = JSON.parse(JSONfile);

    // Add a new record into country array within the JSON file    
    JSONparsed.contact.push(obj);

    // Beautify the resulting JSON file
    var JSONformated = JSON.stringify(JSONparsed, null, 4);

    // Write the updated JSON file back to the system 
    fs.writeFileSync('./data/contacts.json', JSONformated);

    // Convert the updated JSON file to XML     
    var XMLformated = js2xmlparser.parse("contacts", JSON.parse(JSONformated));

    // Write the resulting XML back to the system
    fs.writeFileSync('./data/contacts.xml', XMLformated);

  }

  // Call appendJSON function and pass in body of the current POST request
  appendJSON(req.body);
  
  // Re-direct the browser back to the page, where the POST request came from
  res.redirect('back');

});
*/
  
  
};