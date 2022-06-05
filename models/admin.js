//const Joi = require('joi');
const mongoose = require('mongoose');
// const config = require('config');
// // const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }, 
});




// userSchema.statics.generateAuthToken = function(userId) {
//   const token = jwt.sign({ _id: userId}, config.get('jwtPrivateKey'));
//   return token;
// }

 const Admin = mongoose.model('Admin', adminSchema);

// function validateUser(user) {
//   const schema = {
//     name: Joi.string().min(5).max(50).required(),
//     email: Joi.string().min(5).max(255).required().email(),
//     password: Joi.string().min(5).max(255).required()
//   };

//   return Joi.validate(user, schema);
// }

exports.Admin = Admin; 
// exports.validate = validateUser;