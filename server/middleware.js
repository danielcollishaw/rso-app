const AppError = require("./utils/AppError");
const config = process.env
const jwt = require('jsonwebtoken');
const connection = require("./db");

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
        const token = authHeader;

        jwt.verify(token, "SECRET", (err, user) => {
            if (err) {
                return res.status(403).json({ err });
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

module.exports.isAdmin = (req, res, next) => {
    connection.query(`SELECT * from admins WHERE user_id="${req.user.user_id}"`, (err, response) => {
        if (err) return res.status(500).json({ err: err })
        if (response.length > 0) {
            return next()
        } else {
            return res.status(500).json({ err: 'only admin users are authorized to do this action' })
        }
    })
}

module.exports.isSuperAdmin = (req, res, next) => {
    connection.query(`SELECT * from super_admins WHERE user_id="${req.user.user_id}"`, (err, response) => {
        if (err) return res.status(500).json({ err: err })
        if (response.length > 0) {
            return next()
        } else {
            return res.status(500).json({ err: 'only super admin can create a uni profile' })
        }
    })
}

module.exports.isRSOMember = (req, res, next) => {

}



module.exports.attendsUniversity = (req, res, next) => {

}
