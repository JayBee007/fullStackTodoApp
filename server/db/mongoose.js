var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

var database = mongoose.connect('mongodb://localhost/TodoApp', {
  useMongoClient: true,
  /* other options */
});

database.then((db) => {
    console.log('Database connection estabalished');
}).catch((error) => {
     console.log("Unable to connect", error);    
});


module.exports = {
  mongoose  
};