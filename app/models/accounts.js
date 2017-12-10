
// Contact model with CRUD functions for the contact data in contacts.json

module.exports = function (fs) {
  var module = {};
  
  module.getAccounts = function(){
    var readJson =  fs.readFileSync('./data/accounts.json', 'utf8');
    var jsonData = JSON.parse(readJson);
    return jsonData;
  };
  
  
  module.setAccount = function(data){
   var JSONformated = JSON.stringify(data, null, 4);
   fs.writeFileSync('./data/accounts.json', JSONformated);
  }
  
  
  module.getAccount = function(id){
      var readJson =  fs.readFileSync('./data/accounts.json', 'utf8');
      var data = JSON.parse(readJson);
      var result;

      //Loops through accounts to find the account and return the account object
      for(var i in data.account){
          if(data.account[i].Id ===  id){
              console.log("Found name: " + data.account[i].AccountName);
              result = data.account[i];
          }
      }
      return result;
  }
  
  
  return module;
  
};