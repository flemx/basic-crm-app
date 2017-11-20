module.exports = function(app,fs,bodyParser){
var accountData = require('../models/accounts.js');
myAccountData = new accountData(fs);

  
  
 //Render contact.ejs when opening /contacts URL
app.get('/accounts', function(req, res) {
  console.log("Controller router '/contacts' is executing ");
  res.render('accounts');
});

  
 
//Router to send contacts JSON object when called
 app.get('/get/accounts', function(req, res) {
   var data = myAccountData.getAccounts();
   console.log("Controller router '/get/contacts' is executing ");
   res.send(data);
});
  

 // Post router to add new record to contacts.json 
 app.post('/post/account', function(req, res){
    var data = myAccountData.getAccounts();
    data.account.push(req.body);
    myAccountData.setAccount(data);
    console.log("Controller router '/post/contacts' is executing ");
    res.send(data);
  }); 


   // Post router to add new record to contacts.json 
 app.post('/post/test', function(req, res){
   console.log(req.body); 
   res.send("Hello Client");
  }); 
  
  
  
};