const User = require('../models/users');

    //Redirect
    function loginRedirect(req, res) {
        res.render('adminviews/login.ejs')
    }

    function registerRedirect(req, res) {
        res.render('adminviews/register.ejs')
    }

    //Handle [ signUp - signIn ]
    function signUp(req, res) {
        const { userID, userName, userEmail, userPassword,
            userFirstname, userLastname, userIntroduce,
            userWork, userPhone, userAddress,
            userBirthdate, userBirthYear, userGender, userDuty } = req.body;

        const user = new User(userID, userName, userEmail, userPassword,
            userFirstname, userLastname, userIntroduce,
            userWork, userPhone, userAddress,
            userBirthdate, userBirthYear, userGender, userDuty);

        user.signUp(err => {
            if (err) return res.send('Wrong!!')
            res.render('../views/adminviews/adminhome.ejs');
        });
    }

    function signIn(req, res) {

    }

module.exports = {
    //Redirect
    loginRedirect,
    registerRedirect,

    //callAction
    signUp
}
