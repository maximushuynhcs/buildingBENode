const User = require('../models/users');

module.exports = {

    //Redirect
    loginRedirect: function(req, res) {
        res.render('adminviews/login.ejs')
    },

    registerRedirect: function(req, res) {
        res.render('adminviews/register.ejs')
    },


    //Action
    signUp: function(req, res) {
        const { userID, userName, userEmail, userPassword,
            userFirstname, userLastname, userIntroduce,
            userWork, userPhone, userAddress,
            userBirthdate, userBirthYear, userGender, userDuty } = req.body;

        const user = new User(userID, userName, userEmail, userPassword,
            userFirstname, userLastname, userIntroduce,
            userWork, userPhone, userAddress,
            userBirthdate, userBirthYear, userGender, userDuty);

        user.signIn(err => {
            if (err) return res.send('Wrong!!')
            res.render('../views/adminviews/adminhome.ejs');
        });
    },

    signIn: function(req, res) {

    }
};
