module.exports = function(app,fs,bodyParser){
var accountData = require('../models/accounts.js');
myAccountData = new accountData(fs);

  
  

 //Render contact.ejs when opening /contacts URL
app.get('/accounts', function(req, res) {
  console.log("Controller router '/accounts' is executing ");
  var data = myAccountData.getAccounts();
  res.render('accounts', {accounts: data});
});


    //Test Page
    app.get('/test/:id', function(req, res) {
        var data = myAccountData.getAccounts();
        var result;
        console.log("Id is: " + req.params.id);

        for(var i in data.account){

            //console.log("Name: " + data.contact[i].Name);

            if(data.account[i].Id ===  req.params.id){
                console.log("Found name: " + data.account[i].AccountName);
                result = data.account[i];
            }

        }

        console.log("Will open Account: " + result.AccountName);

        res.render('account', {account: result});
    });

  
  

  
      //Open Account ID
    app.get('/account/:id', function(req, res) {
        var data = myAccountData.getAccounts();
        var result;
        console.log("Id is: " + req.params.id);

        for(var i in data.account){

            //console.log("Name: " + data.contact[i].Name);

            if(data.account[i].Id ===  req.params.id){
                console.log("Found name: " + data.account[i].AccountName);
                result = data.account[i];
            }

        }

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
    var postData = req.body;
    // Add unique Id to record from index integer in JSON file
    postData.Id = "acc" + (data.index + 1);
    data.index = data.index+1;
    console.log("Adding new record to DB with ID: " + postData.Id);
    //add new data to JSON and write it to the file
    data.account.push(postData);
    myAccountData.setAccount(data);
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