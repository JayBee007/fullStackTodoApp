var express = require("express");
var bodyParser = require("body-parser");

var {mongoose} = require("./db/mongoose");
var {Todo} = require("./models/todo");
var {User} = require("./models/user");

var app = express();
app.use(bodyParser.json());

app.get('/', (req,res) => {
   res.send("hello world"); 
});

app.post('/todos', (req,res) => {
   var todo = new Todo({
       text: req.body.text
   });
   
   todo.save().then((doc) => {
       res.send(doc);
   }, (e) => {
        res.status(400).send(e); 
   });
   
   
});

app.listen(process.env.PORT,process.env.IP,() => {
   console.log(`Server started on port ${process.env.PORT} and host ${process.env.IP}`); 
});

module.exports = {
   app
};