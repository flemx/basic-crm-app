module.exports = function(app,fs,bodyParser){
var contactData = require('../models/contacts.js');
myContacts = new contactData(fs);

 
  
  
 //Render contact.ejs when opening /contacts URL
app.get('/contacts', function(req, res) {
  console.log("Controller router '/contacts' is executing ");
  var data = myContacts.getContacts();
  res.render('contacts', {contacts: data});
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
    var postData = req.body;
    // Add unique Id to record from index integer in JSON file
    postData.Id = "con" + (data.index + 1);
    data.index = data.index+1;
    console.log("Adding new record with ID: " + postData.Id);
    //add new data to JSON and write it to the file
    data.contact.push(postData);
    myContacts.setContacts(data);
    console.log("Controller router '/post/contacts' is executing ");
    res.send(data);
  }); 
  
  
};