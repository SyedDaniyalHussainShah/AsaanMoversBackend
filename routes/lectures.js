// const validateObjectId = require('../middleware/validateObjectId');
// const auth = require('../middleware/customerAuth');
// const { Lecture, validate } = require('../models/lecture');
// const bcrypt = require('bcrypt');
// const _ = require('lodash');
// const express = require('express');
// const router = express.Router();

// router.post('/',auth , async (req, res) => {
//     const {error} = validate(req.body);
//     if(error) return res.status(400).send(error.details[0].message);
    
//     let lecture = await Lecture.findOne().and([{ lectureNumber: req.body.lectureNumber },{grade: req.body.grade }]);
//     if(lecture) return res.status(400).send(`Lecture Number already exists in ${req.body.grade}th grade.`);

//     lecture = new Lecture(_.pick(req.body, ['grade', 'link', 'lectureNumber', 'subject', 'description']));
//     await lecture.save();
    
//     res.send(_.pick(lecture, ['grade', 'link', 'lectureNumber', 'subject', 'description']));
// });

// router.get('/:grade', async (req, res) => {
//     const lectures = await Lecture.find({ grade: req.params.grade}).sort('createdAt');
//     res.send(lectures);
// });

// router.put('/:id', [auth, validateObjectId], async (req, res) => {
//     const { error } = validate(req.body); 
//     if (error) return res.status(400).send(error.details[0].message);
  
//     let lecture = await Lecture.findById(req.params.id);
//     if (!lecture) 
//         return res.status(404).send('The Lecture with the given ID was not found.');
    
//     let lectureCheck = await Lecture.findOne().and([{ lectureNumber: req.body.lectureNumber },{grade: req.body.grade }]);
//     if(lectureCheck) 
//         return res.status(400).send(`Lecture Number already exists in ${req.body.grade}th grade.`);

//     lecture.lectureNumber = req.body.lectureNumber;
//     lecture.subject = req.body.subject;
//     lecture.description = req.body.description;
//     lecture.link = req.body.link;
//     lecture.grade = req.body.grade;

//     lecture.save().then((result) => {
//         console.log(result);
//         res.send(lecture);
//     })
//       .catch(err => {
//         console.log(err);
//         res.status(500).send({
//           error: err
//         });
//     });
  
    
//     res.send(lecture);
//   });

//   router.delete('/:id', [auth, validateObjectId], async (req, res) => {
//     const lecture = await Lecture.findByIdAndRemove(req.params.id);
  
//     if (!lecture) return res.status(404).send('The lecture with the given ID was not found.');
  
//     res.send(lecture);
//   });

// module.exports = router;