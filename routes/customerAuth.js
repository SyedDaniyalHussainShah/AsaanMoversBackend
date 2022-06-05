const Joi = require('joi');
const { User } = require('../models/user');
const validate = require('../middleware/validate');
const bcrypt = require('bcrypt');
const express = require('express');
//const auth = require('../middleware/customerAuth');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();

router.post('/', validate(validateAuth), async (req, res) => {    
    let user = await User.findOne({ email: req.body.email });
    if(!user || user.role!="CUSTOMER") return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = User.generateAuthToken(user);

    res.send({jwtToken: token});
});


function validateAuth(req) {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(req, schema);
}

module.exports = router;