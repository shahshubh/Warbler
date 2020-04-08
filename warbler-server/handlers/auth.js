const db = require("../models/index");
//OR
//const db = require("../models")
const jwt = require("jsonwebtoken");

exports.signin = async function(req, res, next){
    try {
        //finding user
        let user = await db.User.findOne({
            email: req.body.email
        });
        let { id, username, profileImgUrl } = user;
        //check pass match
        let isMatch = await user.comparePassword(req.body.password );
        if(isMatch){
            let token = jwt.sign(
                {
                    id,
                    username,
                    profileImgUrl
                }, 
                process.env.SECRET_KEY
            );   
            res.status(200).json({
                id,
                username,
                profileImgUrl,
                token
            });
        } else {
            return next({
                status: 400,
                message: "Invalid email/password"
            });
        }
    } catch (error) {
        return next({
            status: 400,
            message: "Invalid email/password"
        });
    }  
    //log them in

}

exports.signup = async function(req, res, next){
    try {
        let user = await db.User.create(req.body);
        //taking and destructuring data from user var, so its easy to use is ahead i.e. while creating jwt token and passing data into it.
        let { id, username, profileImageUrl } = user;
        let token = jwt.sign(
            {
                id,
                username,
                profileImageUrl
            },
            process.env.SECRET_KEY 
        );
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });
    } catch (err) {
        if(err.code === 11000){
            err.message = "Sorry, that username and/or email is taken"; 
        }
        return next({
            status: 400,
            message: err.message
        });
    }  
};