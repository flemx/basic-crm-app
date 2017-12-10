
// Contact model with CRUD functions for the contact data in contacts.json

module.exports = function (fs) {
  var module = {};
  
  module.getContacts = function(){
    var readJson =  fs.readFileSync('./data/contacts.json', 'utf8');
    var jsonData = JSON.parse(readJson);
    return jsonData;
  };
  
  
  module.setContacts = function(data){
   var JSONformated = JSON.stringify(data, null, 4);
   fs.writeFileSync('./data/contacts.json', JSONformated);
  }


    module.getContact = function(id){
        var readJson =  fs.readFileSync('./data/contacts.json', 'utf8');
        var data = JSON.parse(readJson);
        var result;

        //Loops through accounts to find the account and return the account object
        for(var i in data.contact){
            if(data.contact[i].Id ===  id){
                console.log("Found contact in databse: " + data.contact[i].Id);
                result = data.contact[i];
            }
        }
        return result;
    }
  
  
  
  return module;
  
};