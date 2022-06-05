const express = require('express');
const users = require('../routes/users');
const customers = require('../routes/customers');
const staff = require('../routes/staffs');
const customerAuth = require('../routes/customerAuth');
const staffAuth = require('../routes/staffAuth');
const adminAuth = require('../routes/adminAuth');
const lectures = require('../routes/lectures');
const contents = require('../routes/contents');

module.exports = function (app) {
    app.use(express.json());
    // app.use('/api/users', users);
    app.use('/api/customers', customers);
    app.use('/api/staff', staff);
    app.use('/api/customerAuth',customerAuth);
    app.use('/api/staffAuth',staffAuth);
    app.use('/api/adminAuth',adminAuth);
    //app.use('/api/auth', auth);
    //app.use('/api/lectures', lectures);
    //app.use('/api/contents', contents);
}