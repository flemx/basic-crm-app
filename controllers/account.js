// controller

module.exports = function(app,fs,bodyParser){
var accountData = require('../models/accounts.js');
myAccountData = new accountData(fs);



  

    //Render contact.ejs when opening /contacts URL
    app.get('/accounts', function(req, res) {
      console.log("Controller router '/accounts' is executing ");
      var data = myAccountData.getAccounts();
      res.render('accounts', {accounts: data});
    });



    // Get Account by id
    app.get('/get/account/:id', function(req, res) {
        //Calling getAccount() function from models which returns the Account object by id
        var result = myAccountData.getAccount( req.params.id);
        console.log("Will send Account to client: " + result.AccountName);
        //Sending requested account back to client
        res.send(result);
    });


    // Update Account
    app.post('/account/update', function(req, res){
        console.log("Controller router '/account/update' is executing ");
        var data = myAccountData.getAccounts();
        var updateData = req.body;

        //Finds the record to update by the id and updates with new account object
        console.log("Looking for account id: " + updateData.Id);
        for(var j in data.account){
            if(updateData.Id === data.account[j].Id){
                    console.log("Updating account: " + data.account[j].Id);
                    data.account[j] = updateData;
                    console.log("Successfully updated account: " + data.account[j].AccountName);
            }
        }
        myAccountData.setAccount(data);
        res.send(data);
    });




    //Open Account ID
    app.get('/account/:id', function(req, res) {
        var result = myAccountData.getAccount( req.params.id);
        console.log("Will open Account: " + result.AccountName);

        res.render('account', {account: result});
    });
  
  
  
  
 
//Router to send contacts JSON object when called
 app.get('/get/accounts', function(req, res) {
   var data = myAccountData.getAccounts();
   console.log("Controller router '/get/accounts' is executing ");
   res.send(data);
});
  

 // Post router to add new record to contacts.json 
 app.post('/post/account', function(req, res){
    var data = myAccountData.getAccounts();
    var postData = req.body; // all the new data created from the form 
    // Add unique Id to record from index integer in JSON file
    postData.Id = "acc" + (data.index + 1); // creates an unique ID and appends acc+1 + to a new account
    data.index = data.index+1;
    console.log("Adding new record to DB with ID: " + postData.Id);
    //add new data to JSON and write it to the file
    data.account.push(postData);//adds the new object to the file
    myAccountData.setAccount(data); // writes it back to the jason file
    console.log("Controller router '/post/account' is executing ");
    res.send(data);
  });




//Post route to delete account records from the deleteAccounts() ajax function
    app.post('/delete/accounts', function(req, res){
        var data = myAccountData.getAccounts();
        var toDel = req.body;
        for(var j in data.account){
            for(var i in toDel.$data){
                if(toDel.$data[i] === data.account[j].Id){
                    console.log("Deleting account: " + data.account[j].Id);
                    try{
                        data.account.splice(j,1);
                    }catch(err){
                        console.log("Error while deleting contact: \n" + err);
                    }
            }
            }}

        myAccountData.setAccount(data);
        res.send(data);
    });
  


  
  
};