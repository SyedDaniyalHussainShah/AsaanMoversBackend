// const validateObjectId = require('../middleware/validateObjectId');
// const auth = require('../middleware/customerAuth');
// const _ = require('lodash');
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path')
// const { unlink } = require('fs');
// const { Content, validate } = require('../models/content');

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './contents/');
//     },
//     filename: function(req, file, cb) {
//         cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
//     }
// });

// const upload = multer({ 
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 15
//     }
//  });

// router.post('/',auth, upload.single('contentFile'), (req, res) => { 
//     const {error} = validate(req.body);
//     if(error) return res.status(400).send(error.details[0].message);

//     let content = new Content(_.pick(req.body, ['lectureNumber', 'subject', 'description', 'fileType', 'grade']));
//     content.actualFile = req.file.path;

//     content.save().then((result) => {
//         console.log(result);
//         res.send(content);
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).send({
//           error: err
//         });
//       });
// });

// router.put('/:id', [auth, validateObjectId], upload.single('contentFile'), async (req, res) => {
//     const { error } = validate(req.body); 
//     if (error) return res.status(400).send(error.details[0].message);

//     const content = await Content.findById(req.params.id);
  
//     if (!content) return res.status(404).send('The Content with the given ID was not found.');
//     let reqPath = path.join(__dirname, '../');
//     reqPath = path.join(reqPath, content.actualFile);

    
//     content.lectureNumber = req.body.lectureNumber;
//     content.subject = req.body.subject;
//     content.description = req.body.description;
//     content.fileType = req.body.fileType;
//     content.grade = req.body.grade;
//     content.actualFile = req.file.path;
    
//     unlink(reqPath, (err) => {
//       if (err) console.log(err);
//       console.log('File was updated');
//     });
    
//     content.save().then((result) => {
//       console.log(result);
//       res.send(content);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).send({
//         error: err
//       });
//     });

//   });

// router.delete('/:id', [auth, validateObjectId], async (req, res) => {

//     const content = await Content.findByIdAndRemove(req.params.id);
//     const reqPath = path.join(__dirname, '../');
    
//     if (!content) return res.status(404).send('The Content with the given ID was not found.');
//     unlink(`${reqPath}/${content.actualFile}`, (err) => {
//       if (err) console.log(err);
//       console.log('File was deleted');
//     });
    
//     res.send(content);
//   });

// module.exports = router;