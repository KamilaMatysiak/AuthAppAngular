const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.Role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    user.save((err, user) => {
        if(err) {
            res.status(500).send({message: err});
            return;
        }
        if(req.body.roles) {
            Role.find({
                name: {$in: req.body.roles}
            },
            
            (err, roles) => {
                if(err) {
                    res.status(500).send({message: err});
                    return;
                }
            
                user.roles = roles.map(role => role.id);
                user.save(err => {
                    if(err) {
                        res.status(500).send({message: err});
                        return;
                    }
                    res.send({message: "User registered with role!"})
                });
            });
        } 
        else res.send({message: "User registered!"})
    });
};

exports.signin = (req,res) => {
    User.findOne({
        username: req.body.username
    })  .populate("roles","-__v")
        .exec((err, user) => {
            if(err) {
                res.status(500).send({message: err});
                return;
            }
            if(!user) {
                return res.status(404).send({message:"User not found."});                
            }
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if(!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid password!"
                });
            }

            var token = jwt.sign({id: user.id}, config.secret, {
                expiresIn: 3600
            });

            var authorities = [];
            for(let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }

            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: authorities,
                access_token: token
            });
        });
};

exports.profile = (req, res) => {
    id = req.params.id
    User.findById(id, function(err, user){
        if(err) {
            res.status(500).send({message: err});
            console.log(err);
            return;
        }
        if(!user) {
            return res.status(404).send({message:"User not found."});
        }
        res.status(200).send({
            id: user._id,
            username: user.username,
            email:user.email
        })
    })
}