const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { verifyToken, validateRegister } = require('../middleware')
const { connection } = require('../index')


router.post('/register', validateRegister, (req, res, next) => {
    connection.query(
        `SELECT * FROM users WHERE LOWER(username) = LOWER(${req.body.username});`,
        (err, result) => {
            if (result.length) {
                return res.status(409).send({
                    err: 'This username is already in use!'
                });
            } else {
                // username is available
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).send({
                            err: err
                        });
                    } else {
                        // has hashed pw => add to database
                        db.query(
                            `INSERT INTO users (user_id, username, pass) VALUES ('${uuid.v4()}', ${req.body.username}, ${hash})`,
                            (err, result) => {
                                if (err) {
                                    return res.status(400).send({
                                        err: err
                                    });
                                }
                                return res.status(201).send({
                                    err: '',
                                    msg: 'Registered!'
                                });
                            }
                        );
                    }
                });
            }
        }
    );
})

router.post('/login', (req, res, next) => {
    connection.query(
        `SELECT * FROM users WHERE username = ${req.body.username};`,
        (err, result) => {
            // user does not exists
            if (err) {
                return res.status(400).send({
                    err: err
                });
            }
            if (!result.length) {
                return res.status(401).send({
                    err: 'Username or password is incorrect!'
                });
            }
            // check password
            bcrypt.compare(
                req.body.password,
                result[0]['pass'],
                (bErr, bResult) => {
                    // wrong password
                    if (bErr) {
                        return res.status(401).send({
                            err: 'Username or password is incorrect!'
                        });
                    }
                    if (bResult) {
                        const token = jwt.sign({
                            username: result[0].username,
                            user_id: result[0].user_id
                        },
                            'SECRETKEY', {
                            expiresIn: '7d'
                        }
                        );
                        return res.status(200).send({
                            msg: 'Logged in!',
                            token,
                            user: result[0],
                            res: ''
                        });
                    }
                    return res.status(401).send({
                        err: 'Username or password is incorrect!'
                    });
                }
            );
        }
    );
});

router.get('/secret-testing-route', verifyToken, (req, res, next) => {
    res.send('This is the secret content. Only logged in users can see that!')
})

module.exports = router;