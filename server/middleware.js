const AppError = require("./utils/AppError");
const config = process.env
const jwt = require('jsonwebtoken');
const connection = require("./db");

module.exports.validateRegister = (req, res, next) => {
    // username min length 3
    if (!req.body.username || req.body.username.length < 3) {
        return res.status(400).json({err: "Please enter a username with min. 3 chars"})
    }
    // password min 6 chars
    if (!req.body.password || req.body.password.length < 6) {
        return res.status(400).json({err: "Please enter a password with min. 6 chars"})
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

//to check if admin is admin for the specific event
module.exports.isSpecificAdmin = (req, res, next) => {
    connection.query(`SELECT * from organizes WHERE user_id="${req.user.user_id} AND event_id="${req.params.event_id}"`, (err, response) => {
        if (err) return res.status(500).json({ err: err })
        if (response.length > 0) {
            return next()
        } else {
            return res.status(500).json({ err: "only this event's admin users are authorized to do this action" })
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


module.exports.isReviewAuthor = (req, res, next) => {
    const { review_id, event_id } = req.params

    connection.query(`SELECT * FROM rates WHERE event_id = "${event_id}" AND rate_id = "${review_id}" AND user_id = "${req.user.user_id}"`, (err, response) => {
        if (err) return res.status(500).json({ err: err })
        else {
            if (response.length > 0) {
                return next()
            } else {
                return res.status(500).json({ err: "you can only update the comments that you have made" })
            }
        }
    })
}

module.exports.isAlreadyAdmin = (req, res, next) => {
    connection.query(`SELECT * from admins WHERE user_id="${req.user.user_id}"`, (err, response) => {
        if (err) return res.status(500).json({ err: err })
        if (response.length > 0) {
            return res.status(500).json({ err: 'you are already an admin for an rso. 1 admin - 1 rso. You can join other rso-s though' })
        } else {
            return next()
        }
    })
}

module.exports.isRSOMember = (req, res, next) => {
    connection.query(`SELECT * from joins WHERE user_id="${req.user.user_id}" AND rso_id="${req.params.rso_id}"`, (err, response) => {
        if (err) return res.status(500).json({ err: err })
        if (response.length > 0) {
            return next()
        } else {
            return res.status(500).json({ err: 'you are not a member of this rso' })
        }
    })
}

module.exports.isActiveRSO = (req, res, next) => {
    connection.query(`SELECT * from rsos WHERE user_id="${req.user.user_id}"`, (err, response) => {
        if (err) return res.status(500).json({ err })
        else {
            if (response.length > 0 && response[0].activity == "inactive") {
                return res.status(500).json({ err: 'only active RSO-s can create events' })
            }
            else {
                return next()
            }
        }
    })
}
