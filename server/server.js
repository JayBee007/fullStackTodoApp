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

app.use(express.static('client/build'));

var PORT = process.env.PORT || 3001;
var IP = process.env.PORT || 'localhost';

app.use(bodyParser.json());

app.get('/', (req,res) => {
      res.sendFile(path.join(__dirname,'/client/build/index.html'));
});

app.post('/todos', authenticate, (req,res) => {
   var todo = new Todo({
       text: req.body.text,
       _creator: req.user._id
   });

   todo.save().then((doc) => {
       res.send(doc);
   }, (e) => {
        res.status(400).send(e);
   });

});

app.get('/todos', authenticate, (req,res) => {
   Todo.find({_creator: req.user._id})
      .then((todos) => {
         res.send({todos});
      }, (e) => {
         res.status(400).send(e);
      });
});

app.get('/todos/:id', authenticate, (req,res) => {
   var id = req.params.id;

   if(!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).send();
      res.end();
   }
   Todo.findOne({
      _id:id,
      _creator: req.user._id
   }).then((todo) => {
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

app.delete('/todos/:id', authenticate, (req,res) => {
   var id = req.params.id;

   if(!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).send();
      res.end();
   }

   Todo.findOneAndRemove({
      _id:id,
      _creator: req.user._id

   }).then((todo) => {
      if(!todo) {
         res.status(404).send();
         res.end();
      }
      res.status(200).send({todo});

   }).catch((e) => {
      res.status(400).send();
   });

});

app.patch('/todos/:id', authenticate, (req,res) => {
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

   Todo.findOneAndUpdate({
      _id:id,
      _creator: req.user._id
   }, {$set:body}, {new: true})
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

   user.save().then(() => {
      return user.generateAuthToken();
   }).then((token) => {
      res.header('x-auth',token).send(user);
   }).catch((e) => {
      res.status(400).send(e);
   });

});


app.get('/users/me', authenticate, (req,res) => {
   res.send(req.user);
});

app.post('/users/login',(req,res) => {
   var body = _.pick(req.body, ['email','password']);

   User.findByCredentials(body.email,body.password)
      .then((user) => {
         return user.generateAuthToken().then((token) => {
            res.header('x-auth',token).send(user);
         });
      }).catch((e) => {
         res.status(400).send();
      });

});

app.delete('/users/me/token', authenticate, (req,res) => {
   req.user.removeToken(req.token)
      .then(() => {
         res.status(200).send();
      }, (e) => {
         res.status(400).send();
      });
});

app.get("*", (req,res) => {
      res.sendFile(path.join(__dirname,'/client/build/index.html'));
});



app.listen(process.env.PORT,() => {
   console.log(`Server started on port ${PORT} and host ${HOST}`);
});

module.exports = {
   app
};
