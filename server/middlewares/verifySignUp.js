const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameorEmail = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if(err) {
            res.status(500).send({ message: err });
            return;
        }

        if(user) {
            res.status(400).send({ message:"Username taken." })
            return;
        }

        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if(err) {
                res.status(500).send({ message: err });
                return;
            }

            if(user) {
                res.status(400).send({ message:"E-mail taken." })
                return;
            }
            next();
        });
    });
};

checkRoleExist = (req, res, next) => {
    if(req.body.ROLES) {
        for(let i = 0; i < req.body.roles.length; i++) {
            if(!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({ message: `Role ${req.body.roles[i]} doesn't exist.`});
                return;
            }
        }
    }
    next();
};

const verifySignUp = {
    checkDuplicateUsernameorEmail,
    checkRoleExist
};

module.exports = verifySignUp;