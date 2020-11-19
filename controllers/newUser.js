const flash = require('connect-flash');

module.exports = (req, res) => {
    res.render('register', {
        errors: req.flash('validationErrors')
    });
}