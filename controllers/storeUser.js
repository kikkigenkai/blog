const User = require('../models/User');
const path = require('path');

module.exports = (req, res) => {
    User.create(req.body, (err, user) => {
        if (err) {
            console.log(err);
            const validationErrors = Object.keys(err.errors).map(key => err.errors[key].message);
            req.flash('validationErrors', validationErrors)
            return res.redirect('/auth/register');
        }

        res.redirect('/');
    });
}