const { hash, compare } = require('bcrypt');
const queryDB = require('../db');

class Users {
    constructor(userID, userName, userEmail, userPassword,
        userFirstname, userLastname, userIntroduce, userWork,
        userPhone, userAddress, userBirthDate, userBirthYear, userGender, userDuty) {
        this.userID = userID;
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
        this.userBirthYear = userBirthYear;
        this.userGender = userGender;
        this.userDuty = userDuty;
    }

    signUp(cb) {
        hash(this.userPassword, 8, (err, encrypted) => {
            if (err) return cb(err);
            const signUpSQL =
                `INSERT INTO public.users(
                "userID","userName", "userEmail", "userPassword", 
                "userFirstname", "userLastname", "userIntroduce", 
                "userWork", "userPhone", "userAddress", 
                "userBirthDate", "userBirthYear", "userGender", "userDuty")
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);`;
            queryDB(signUpSQL, [
                this.userID, this.userName, this.userEmail, encrypted,
                this.userFirstname, this.userLastname, this.userIntroduce,
                this.userWork, this.userPhone, this.userAddress,
                this.userBirthDate, this.userBirthYear, this.userGender, this.userDuty], cb);
        });
    }

    //signIn with email
    signIn(cb) {
        const signInSql = `SELECT * FROM "users" WHERE "userEmail" = $1 OR "userName" = $2`
        queryDB(signInSql, [this.userEmail, this.userName], (err, result) => {
            if (err) return cb(err);
            if (result.rows.length === 0) return cb(new Error('Email undefined!!! OR Password undefined'));
            const encrypted = result.rows[0].userPassword;
            compare(this.userPassword, encrypted, (errCompare, same) => {
                if(errCompare) return cb(errCompare);
                if(!same) return cb(new Error('Password Wrong!!!'));
                cb(null, result.rows[0].userLastname);
            });
        });
    }
}

module.exports = Users;


//TeST userClass

//signUp
// const user = new Users('2', 'maximushuynhcs', 'maximushuynhcs@gmail.com', '12345', 'Maximus', 'Huynh', 'I Am Maximus', 'Tester', '0902667474', 'HCMC', '11/12', '1994', '1', 'Administrator');
// user.signUp(err => console.log(err));

//signIn
// const user = new Users('maximushuynhcsasdf', '12345');
// user.signIn(err => console.log(err));

