//const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024
    },
    role: {
      type: String,
      enum: ['CUSTOMER','STAFF','ADMIN'],
      uppercase: true
    },
    contact: {
      type: String,
      required: true,
      minlength: 6
    },
    createdAt: { 
      type:Date,
      default: Date.now},
   profilePic: {
       type: String,
       required: true
   }
   


});


userSchema.statics.generateAuthToken = function(user) {
  const token = jwt.sign({ _id: user._id, role: user.role, name: user.name , email : user.email }, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('User', userSchema);

////function validateUser(user) {
////  const schema = {
////    name: Joi.string().min(5).max(50).required(),
////    email: Joi.string().min(5).max(255).required().email(),
////    password: Joi.string().min(5).max(255).required(),
////    contact: Joi.string(),
////  };
//
  //return Joi.validate(user, schema);
//}

exports.User = User; 
//exports.validate = validateUser;