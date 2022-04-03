const AppError = require("./utils/AppError");
require('dotenv').config()


module.exports.validateRegister = (req, res, next) => {
    // username min length 3
    if (!req.body.username || req.body.username.length < 3) {
        throw new AppError('Please enter a username with min. 3 chars', 400)
    }
    // password min 6 chars
    if (!req.body.password || req.body.password.length < 6) {
        throw new AppError('Please enter a password with min. 6 chars', 400)
    }
    // password (repeat) does not match
    if (!req.body.password_repeat || req.body.password != req.body.password_repeat) {
        throw new AppError('Passwords do not match', 400)
    }
    next();
};

module.exports.verifyToken = (req, _, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        throw new AppError("A token is required for authentication", 403);
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        throw new AppError("Invalid authorization token", 401)
    }
    return next();
}

module.exports.isAdmin = () => {

}

module.exports.isSuperAdmin = () => {

}

module.exports.isRSOMember = () => {

}

module.exports.attendsUniversity = () => {

}
