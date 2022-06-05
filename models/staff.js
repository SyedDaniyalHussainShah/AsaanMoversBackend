const Joi = require('joi');
const mongoose = require('mongoose');
//const config = require('config');
//const jwt = require('jsonwebtoken');

const staffSchema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    type: {
        type: String,
        enum: ['DRIVER','LABOURER'],
        uppercase: true
    },
    status: {
        type: String,
        enum: ['INACTIVE','ACTIVE','BUSY'],
        uppercase: true
    }
    
});




// userSchema.statics.generateAuthToken = function(userId) {
//   const token = jwt.sign({ _id: userId}, config.get('jwtPrivateKey'));
//   return token;
// }

 const Staff = mongoose.model('Staff', staffSchema);

 function validateUser(staff) {
   const schema = {
     
     name: Joi.string().min(5).max(50).required(),
     email: Joi.string().min(5).max(255).required().email(),
     password: Joi.string().min(5).max(255).required(),
     contact: Joi.string().required(),
     
     
     type: Joi.string().required()
   };

   return Joi.validate(staff, schema);
 }

//  function validatePassword(staff) {
//   const schema = {
    
//     oldPassword: Joi.string().min(5).max(255).required(),
//     newPassword: Joi.string().min(5).max(255).required()
    
//   };

//   return Joi.validate(staff, schema);
// }

exports.Staff = Staff; 
exports.validate = validateUser;
//exports.validatePassword = validatePassword;