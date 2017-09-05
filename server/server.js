require("./config/config");
var express = require("express");
var bodyParser = require("body-parser");
var _ = require("lodash");

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

app.get('/todos', (req,res) => {
   Todo.find()
      .then((todos) => {
         res.send({todos});  
      }, (e) => {
         res.status(400).send(e);
      });
});

app.get('/todos/:id',(req,res) => {
   var id = req.params.id;
   
   if(!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).send();
      res.end();
   }
   Todo.findById(id).then((todo) => {
      if(!todo) {
         res.status(404).send();
         res.end();
      }
      res.status(200).send({
         todo
      });
   }).catch((e) => {
         res.status(400).send();
   }); 
});

app.delete('/todos/:id',(req,res) => {
   var id = req.params.id;
   
   if(!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).send();
      res.end();
   }
   
   Todo.findByIdAndRemove({_id:id}).then((todo) => {
      if(!todo) {
         res.status(404).send();
         res.end();
      }
      res.status(200).send({todo});
      
   }).catch((e) => {
      res.status(400).send();
   });
   
});

app.patch('/todos/:id', (req,res) => {
   var id = req.params.id;
   var body = _.pick(req.body, ['text', 'completed']);
   
   if(!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).send();
      res.end();
   }
   
   if( _.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
   }else {
      body.completed = false;
      body.completedAt = null;
   }
   
   Todo.findByIdAndUpdate(id, {$set:body}, {new: true})
      .then((todo) => {
         if(!todo) {
            res.status(404).send();
            res.end();
         }
         res.send({todo});
         
      }).catch((e) => {
         res.status(400).send();
      });
   
});

app.post('/users', (req,res) => {
   var body = _.pick(req.body, ['email', 'password']);
   
   var user = new User({
      email: body.email,
      password: body.password
   });
   
   user.save().then((user) => {
      res.send(user);
   },(e) => {
      res.status(400).send(e);
   });
   
});

app.listen(process.env.PORT,process.env.IP,() => {
   console.log(`Server started on port ${process.env.PORT} and host ${process.env.IP}`); 
});

module.exports = {
   app
};