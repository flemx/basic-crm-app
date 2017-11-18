

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
  
  
  
  return module;
  
};