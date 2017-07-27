const User = require('../models/users');
const session = require('express-session');
const cookieParse = require('cookie-parser');
const jwt = require('jsonwebtoken');

const SECRET_KEY = '15uname123498af!';

    //Redirect
    function loginRedirect(req, res) {
        res.render('adminviews/login')
    }

    function registerRedirect(req, res) {
        res.render('adminviews/register')
    }

    //Handle [ signUp - signIn ]
    function signUp(req, res) {
        const { userName, userEmail, userPassword,
            userFirstname, userLastname, userIntroduce,
            userWork, userPhone, userAddress,
            userBirthdate, userGender, userTypeID } = req.body;

        const user = new User(userName, userEmail, userPassword,
            userFirstname, userLastname, userIntroduce,
            userWork, userPhone, userAddress,
            userBirthdate, userGender, userTypeID);

        user.signUp(err => {
            if (err) return res.send('Wrong!!');
            res.redirect('/signIn');
        });
    }

    function signIn(req, res) {
        const { userEmail, userPassword } = req.body;
        const user = new User( userEmail, userPassword );
        user.signIn((err, name) => {
            // if (err) return res.send('ERROR!!!');
            if (err) return console.log(err)
            jwt.sign({ name }, SECRET_KEY, { expiresIn: 30 }, (err, token) => {
                res.cookie('token', token);
                res.send('Login Completed !!');
            });
        });
    }

module.exports = {
    //Redirect
    loginRedirect,
    registerRedirect,

    //callAction
    signUp,
    signIn
}
