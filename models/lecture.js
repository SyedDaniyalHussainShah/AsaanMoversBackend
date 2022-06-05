const Joi = require('joi');
const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  grade: {
      type: Number,
      required: true,
      min: 9,
      max: 12
    },
    link: {
      type: String,
      required: true,
      maxlength: 255,
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
       default: Date.now}
      
});




const Lecture = mongoose.model('Lecture', lectureSchema);

function validateLecture(lecture) {
  const schema = {
    grade: Joi.number().min(9).max(12).required(),
    link: Joi.string().max(255).required(),
    lectureNumber: Joi.number().min(1).max(9999).required(),    
    subject: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(5).max(2000).required()
  };

  return Joi.validate(lecture, schema);
}

exports.Lecture = Lecture; 
exports.validate = validateLecture;