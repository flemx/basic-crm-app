
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
  
  
  module.setIndex = function(){
    
  }
  
  
  return module;
  
};