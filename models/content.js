const Joi = require('joi');
const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    grade: {
      type: Number,
      required: true,
      min: 9,
      max: 12
    },
    lectureNumber: {
      type: Number,
      required: true,
      min: 1,
      max:9999
    },
    subject: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 2000
      },
    createdAt: { 
       type:Date,
       default: Date.now},
    actualFile: {
        type: String,
        required: true
    },
    fileType:{
      type: String,
      required: true
    }   
      
});


const Content = mongoose.model('Content', contentSchema);

function validateContent(content) {
  const schema = {
    grade: Joi.number().min(9).max(12).required(),
    lectureNumber: Joi.number().min(1).max(9999).required(),    
    subject: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(5).max(2000).required(),
    fileType: Joi.string().required()

  };

  return Joi.validate(content, schema);
}

exports.Content = Content; 
exports.validate = validateContent;