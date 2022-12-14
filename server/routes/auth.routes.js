const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const { user } = require("../models");

module.exports = function(app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/register",
        [
            verifySignUp.checkDuplicateUsernameorEmail,
            verifySignUp.checkRoleExist
        ],
        controller.signup
    );

    app.post("/login", controller.signin);

    app.get("/profile/:id", [authJwt.verifyToken], controller.profile);
};