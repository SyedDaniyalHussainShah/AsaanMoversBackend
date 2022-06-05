const customerAuth = require('../middleware/customerAuth');
const { User } = require('../models/user');
const { Customer, validate } = require('../models/customer');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

 router.get('/me', customerAuth , async(req, res) => {
   const user = await User.findById(req.user._id).select({_id : 1,name : 1, email: 1,contact:1});
   res.send(user);
 });

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).send('User already registered.');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        role: "CUSTOMER",
        contact: req.body.contact,
        password: req.body.password

    });
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    
    await user.save();
    
    let customer = new Customer({
        user: user._id
    })
    await customer.save();
    
    const token = User.generateAuthToken(user);

    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email', 'contact']));
});

router.post('/update',customerAuth, async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const customer = await User.findByIdAndUpdate(req.user._id,
      { 
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        password: password
      }, { new: true });
  
   // if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    
    res.send(_.pick(customer, ['_id', 'name', 'email', 'contact']));
  });
  
  router.post('/delete',customerAuth ,async (req, res) => {
    const customer = await User.findByIdAndRemove(req.user._id);
  
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  
    res.send(_.pick(customer, ['_id', 'name', 'email', 'contact']));
  });

module.exports = router;