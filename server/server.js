require("./config/config");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var _ = require("lodash");

var {mongoose} = require("./db/mongoose");
var {Todo} = require("./models/todo");
var {User} = require("./models/user");
var {authenticate} = require("./middleware/authenticate");

var PORT = process.env.PORT || 3001;
var HOST = process.env.IP || 'localhost';

var app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../client/build')));

// app.get('/', (req,res) => {
//    res.send("hello world");
// });

app.post('/todos', authenticate, async (req,res) => {
   const todo = new Todo({
       text: req.body.text,
       _creator: req.user._id
   });

   try {
         const doc = await todo.save();
         res.send(doc);
   } catch (e) {
      res.status(400).send(e);
   }

});

app.get('/todos', authenticate, async (req,res) => {
      try {
            const todos = await Todo.find({_creator: req.user._id});
            res.send({todos});
      } catch (e) {
            res.status(400).send(e);
      }
});

app.get('/todos/:id', authenticate, async (req,res) => {
   const id = req.params.id;

   if(!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).send();
      res.end();
   }
   try {
         const todo = await Todo.findOne({_id:id, _creator: req.user._id});
         if(!todo) { res.status(404).send(); res.end(); }
         res.status(200).send({todo});
   } catch (e) {
      res.status(400).send();
   }
});

app.delete('/todos/:id', authenticate, async (req,res) => {
   const id = req.params.id;

   if(!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(404).send();
   }

   try {
         const todo = await Todo.findOneAndRemove({
               _id: id,
               _creator: req.user._id
         });
         if(!todo) {res.status(404).send();}
         res.send({todo});
   } catch (e) {
         res.status(400).send();
   }

});

app.patch('/todos/:id', authenticate, async (req,res) => {
   const id = req.params.id;
   const body = _.pick(req.body, ['text', 'completed']);

   if(!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).send();
   }

   if( _.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
   }else {
      body.completed = false;
      body.completedAt = null;
   }

   try {
         const todo = await Todo.findOneAndUpdate({
            _id:id,
            _creator: req.user._id
         }, {$set:body}, {new: true});
         if(!todo) {
            res.status(404).send();
         }
         res.send({todo});
   } catch (e) {
         res.status(400).send();
   }
});

app.post('/users', async (req,res) => {
      try {
            const body = _.pick(req.body, ['email', 'password']);
            const user = new User(body);
            await user.save();
            const token = await user.generateAuthToken();
            res.header('x-auth',token).send(user);
      } catch (e) {
            res.status(400).send(e);
      }
});


app.get('/users/me', authenticate, (req,res) => {
   res.send(req.user);
});

app.post('/users/login', async (req,res) => {

   try {
      const body = _.pick(req.body, ['email','password']);
      const user = await User.findByCredentials(body.email,body.password);
      const token = await user.generateAuthToken();
      res.header('x-auth',token).send(user);
   } catch (e) {
      res.status(400).send();
   }

});

app.delete('/users/me/token', authenticate, async (req,res) => {
      try {
            await req.user.removeToken(req.token);
            res.status(200).send();
      } catch (e) {
            res.status(400).send();
      }
});

// app.get('*', (req, res) => {
//       res.sendFile(path.join(__dirname+'../client/build/index.html'));
// });




app.listen(PORT,HOST,() => {
   console.log(`Server started on port ${PORT} and host ${HOST}`);
});

module.exports = {
   app
};
