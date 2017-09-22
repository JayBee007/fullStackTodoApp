var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

var {Todo} = require('../../models/todo');
var {User} = require("../../models/user");

const userOneId = new mongoose.Types.ObjectId();
const userTwoId = new mongoose.Types.ObjectId();
const users =   [{
                    _id: userOneId,
                    email: 'johndoe@doe.com',
                    password: 'userOnePass',
                    tokens: [{
                        access: 'auth',
                        token: jwt.sign({_id: userOneId, access:'auth'}, 'somesecret').toString()
                    }]
                },{
                    _id: userTwoId,
                    email: 'janedoe@doe.com',
                    password: 'userTwoPass'
                
                }];

const todos = [{
        _id: new mongoose.Types.ObjectId(),
        text: 'First test todo',
        _creator: userOneId
    },{
        _id: new mongoose.Types.ObjectId(),
        text: 'Second test todo',
        completed: true,
        completedAt: 333,
        _creator: userTwoId
    }];
    

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);    
    }).then(() => done());
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();
        
        return Promise.all([userOne,userTwo]);
        
    }).then(() => done());
};

module.exports = {
    todos,
    users,
    populateTodos,
    populateUsers
};