const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { verifyToken, validateRegister } = require('../middleware')
const connection = require('../db')
const { v4: uuidv4 } = require('uuid')

router.post('/register', validateRegister, (req, res) => {

    connection.query(
        `SELECT * FROM users WHERE LOWER(username) = LOWER("${req.body.username}");`,
        (err, result) => {
            if (result.length > 0) {
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
                        connection.query(
                            `INSERT INTO users (user_id, username, pass) VALUES ("${uuidv4()}", "${req.body.username}", "${hash}")`,
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


router.post('/login', (req, res) => {
    const { password, username } = req.body

    if (!password || !username) {
        return res.status(400).send({ err: 'missing fields' })
    }

    else {
        connection.query(
            `SELECT * FROM users WHERE username = "${username}";`,
            (err, result) => {
                // user does not exists
                if (err) {
                    return res.status(400).send({
                        err: err
                    });
                }
                if (!result.length) {
                    return res.status(401).send({
                        err: 'No user found!'
                    });
                }
                // check password
                bcrypt.compare(
                    password,
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
                                "SECRET", {
                                expiresIn: '7d'
                            }
                            );
                            return res.status(200).send({
                                msg: 'Logged in!',
                                token: token,
                                user: result[0],
                            });
                        }
                        return res.status(401).send({
                            err: 'Username or password is incorrect!'
                        });
                    }
                );
            }
        );
    }
})

router.get('/secret-testing-route', verifyToken, (req, res) => {
    res.send('This is the secret content. Only logged in users can see that!')
})

module.exports = router;