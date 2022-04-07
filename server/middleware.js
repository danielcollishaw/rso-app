const AppError = require("./utils/AppError");
const config = process.env
const jwt = require('jsonwebtoken')

module.exports.validateRegister = (req, res, next) => {
    // username min length 3
    if (!req.body.username || req.body.username.length < 3) {
        throw new AppError('Please enter a username with min. 3 chars', 400)
    }
    // password min 6 chars
    if (!req.body.password || req.body.password.length < 6) {
        throw new AppError('Please enter a password with min. 6 chars', 400)
    }
    next();
};

module.exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, "SECRET", (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

module.exports.isAdmin = () => {

}

module.exports.isSuperAdmin = () => {

}

module.exports.isRSOMember = () => {

}

module.exports.attendsUniversity = () => {

}
