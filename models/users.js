const queryDB = require('../db');
const { hash, compare } = require('bcrypt');

class Users {
    constructor(userName, userEmail,
        userPassword, userFirstname, userLastname,
        userIntroduce, userWork, userPhone, userAddress,
        userBirthDate, userGender, userTypeID) {

        this.userName = userName;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.userFirstname = userFirstname;
        this.userLastname = userLastname;
        this.userIntroduce = userIntroduce;
        this.userWork = userWork;
        this.userPhone = userPhone;
        this.userAddress = userAddress;
        this.userBirthDate = userBirthDate;
        this.userGender = userGender;
        this.userTypeID = userTypeID;
    }   

    signUp(cb) {
        hash(this.userPassword, 8, (err, encrypted) => {
            if (err) return cb(err);
            const signUpSQL =
                `INSERT INTO public.users(
                "userName", "userEmail", "userPassword", 
                "userFirstname", "userLastname", "userIntroduce", 
                "userWork", "userPhone", "userAddress", 
                "userBirthDate", "userGender", "userTypeID")
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`;

            queryDB(signUpSQL, [
                this.userName, this.userEmail, encrypted,
                this.userFirstname, this.userLastname, this.userIntroduce,
                this.userWork, this.userPhone, this.userAddress,
                this.userBirthDate, this.userGender, this.userTypeID], cb);
        });
    }

    signIn(cb) {
        const signInsql = `SELECT * FROM public."users" WHERE "userEmail" = $1`;
        console.log(signInsql);
        queryDB(signInsql, [this.userEmail], (err, result) => {
            if (err) return cb(err);
            if (result.rows.length === 0) return cb(new Error('Email undefined!!!'));
            const encrypted = result.rows[0].userPassword;
            compare(this.userPassword, encrypted, (errCompare, same) => {
                if (errCompare) return cb(errCompare);
                if (!same) return cb(new Error('Password Wrong!!!'));
                cb(null, result.row[0].userLastname);
            });
        });
    }

}

module.exports = Users;


//TeST userClass

//signUp
// const user = new Users('3', 'maximus', 'maximus@gmail.com', '12345', 'Maximus', 'Huynh', 'I Am Maximus', 'Tester', '0902667474', 'HCMC', '11/12', '1994', '1', '2');
// user.signUp(err => console.log(err));

//signIn
// const user = new Users('','administrator@gmail.com', '12345');
// user.signIn(err => console.log(err));

// console.log(user);

