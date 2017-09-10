var mongoose =      require("mongoose");
var validator =     require("validator");
var _ =             require("lodash");
var bcrypt =        require("bcryptjs");
var jwt =           require("jsonwebtoken");
var Schema =        mongoose.Schema;

var UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{value} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON =function() {
    var user = this;
    
    var userObject = user.toObject();
    
    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id, access}, 'somesecret').toString();
    
    user.tokens.push({access,token});
    
    return user.save().then(() => {
        return token;
    });
};

UserSchema.statics.findByToken = function(token) {
    var User = this;
    var decoded;
    
    try {
        decoded = jwt.verify(token, 'somesecret');
    } catch (e) {
        return Promise.reject(e);
    }
    
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

// bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash("B4c0/\/", salt, function(err, hash) {
//         // Store hash in your password DB. 
//     });
// });

UserSchema.pre('save',function(next) {
   var user = this;
   
   if(user.isModified('password')) {
       
       bcrypt.genSalt(10, function(err,salt) {
          
          if(err) {console.log(err)}
          
          bcrypt.hash(user.password,salt,function(err,hash) {
             
            if(err) {console.log(err)}
            user.password = hash;
            next();
          });
       });
       
   } else {
       next();
   }
   
   
   
});

var User = mongoose.model("User", UserSchema);

module.exports = {
    User
};