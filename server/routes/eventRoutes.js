const eventRouter = require('express').Router();
const { verifyToken, isAdmin, isSpecificAdmin, isReviewAuthor, isActiveRSO } = require('../middleware');
const AppError = require('../utils/AppError');
const connection = require('../db')
const { v4: uuidv4 } = require('uuid')

//try solution for get events
eventRouter.get('/events', verifyToken, (req, res) => {

    //show public events
    connection.query(
        //first query is public, 2nd query is private, 3rd query is RSO
        `SELECT E.* FROM events E WHERE E.type_of = "PUBLIC"
        UNION
        SELECT E1.* FROM events E1, organizes O, admins AD, attends A WHERE A.user_id = "${req.user.user_id}" AND A.uni_id = AD.uni_id AND AD.user_id = O.user_id AND O.event_id = E1.event_id AND E1.type_of = "PRIVATE"
        UNION
        SELECT E2.* FROM events E2, rsos R, organizes O1, joins J WHERE J.user_id = "${req.user.user_id}" AND J.rso_id = R.rso_id AND R.user_id = O1.user_id AND O1.event_id = E2.event_id AND E2.type_of = "RSO"
        `
        , (err, result) => {
            if (err) {
                res.status(500).json({ err: `smth happened on the server, ${err}` })
            } else {
                res.status(200).json(result)
            }
        })
})


/*
eventRouter.get('/events', verifyToken, (req, res) => {
    connection.query('SELECT * FROM events WHERE type_of = "PUBLIC"', (err, result) => {
        if (err) {
            res.status(500).json({ err: `smth happened on the server, ${err}` })
        } else {
            res.status(200).json(result)
        }
    })
})*/

//needs fixing as it does not check if u r RSO member or attend the uni
eventRouter.get('/events/:event_id', verifyToken, (req, res) => {
    const { event_id } = req.params
    connection.query(`SELECT * FROM events WHERE event_id = "${event_id}"`, (err, result) => {
        if (err) {
            res.status(500).json({ err: `smth happened on the server, ${err}` })
        } else {
            res.status(200).json(result)
        }
    })

})

eventRouter.post('/events', verifyToken, isAdmin, isActiveRSO, (req, res) => {
    const { date_time, phone, email, name, type_of, description, start_time, address } = req.body
    const event_id = uuidv4()

    connection.query(
        `INSERT INTO events (event_id, date_time, phone, email, name, type_of, description, start_time, address) VALUES ("${event_id}", "${date_time}", "${phone}", "${email}", "${name}", "${type_of}", "${description}", "${start_time}", "${address}")`
        , (err, response) => {
            if (err) {
                res.status(500).json({ err: err })
            } else {
                connection.query(`INSERT INTO organizes (user_id, event_id) VALUES ("${req.user.user_id}", "${event_id}")`, (err2, response2) => {
                    if (err2) {
                        res.status(500).json({ err: err2 })
                    } else {
                        res.status(200).json({ response: response2, err: '' })
                    }
                })
            }
        })
})

eventRouter.put('/events/:event_id', verifyToken, isAdmin, isSpecificAdmin, (req, res) => {
    const { date_time, phone, email, name, type_of, description, start_time, address } = req.body
    connection.query(
        `UPDATE events SET date_time="${date_time}", phone="${phone}", email="${email}", name="${name}", type_of="${type_of}", description="${description}", start_time="${start_time}", address="${address}" WHERE event_id="${req.params.event_id}"`
        , (err, response) => {
            if (err) {
                return res.status(500).json({ err: err })
            } else {
                return res.status(200).json({ response: response, err: '' })
            }
        })
})


eventRouter.delete('/events/:event_id', verifyToken, isAdmin, isSpecificAdmin, (req, res) => {
    connection.query(
        `DELETE FROM EVENTS WHERE event_id="${req.params.event_id}"`
        , (err, response) => {
            if (err) {
                return res.status(500).json({ err: err })
            } else {
                return res.status(200).json({ response: response, err: '' })
            }
        })
})



//post reviews
eventRouter.post('/events/:event_id/reviews', verifyToken, (req, res) => {
    const rate_id = uuidv4()
    const { event_id } = req.params
    const { comment, rating, time } = req.body

    connection.query(
        `INSERT INTO rates (rate_id, user_id, event_id, comment, rating, time) VALUES ("${rate_id}", "${req.user.user_id}", "${event_id}", "${comment}", "${rating}", "${time}")`, (err, result) => {
            if (err) {
                res.status(500).json({ err: `smth happened on the server, ${err}` })
            } else {
                res.status(200).json(result)
            }
        })

})

//get reviews
eventRouter.get('/events/:event_id/reviews', verifyToken, (req, res) => {
    const { event_id } = req.params

    connection.query(`SELECT * FROM rates WHERE event_id = "${event_id}"`, (err, result) => {
        if (err) {
            res.status(500).json({ err: `smth happened on the server, ${err}` })
        } else {
            res.status(200).json(result)
        }
    });
});

//update rating/comments
eventRouter.put('/events/:event_id/reviews/:review_id', verifyToken, isReviewAuthor, (req, res) => {
    connection.query(
        `UPDATE rates SET comment="${comment}", rating="${rating}", time="${time}" WHERE rate_id="${req.params.rate_id}" AND event_id="${req.params.event_id}"`
        , (err, response) => {
            if (err) {
                return res.status(500).json({ err: err })
            } else {
                return res.status(200).json({ response: response, err: '' })
            }
        })
})


//delete rating/comments
eventRouter.delete('/events/:event_id/reviews/:review_id', verifyToken, isReviewAuthor, (req, res) => {
    connection.query(
        `DELETE FROM rates WHERE rate_id="${req.params.review_id}" AND event_id="${req.params.event_id}"`
        , (err, response) => {
            if (err) {
                return res.status(500).json({ err: err })
            } else {
                return res.status(200).json({ response: response, err: '' })
            }
        })
})


module.exports = eventRouter;
