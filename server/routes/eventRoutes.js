const eventRouter = require('express').Router();
const { verifyToken, isAdmin, isSpecificAdmin } = require('../middleware');
const AppError = require('../utils/AppError');
const connection = require('../db')
const { v4: uuidv4 } = require('uuid')

//needs fixing cuz it shows only public events
eventRouter.get('/events', verifyToken, (req, res) => {
    connection.query('SELECT * FROM events WHERE type_of = "PUBLIC"', (err, result) => {
        if (err) {
            res.status(500).json({ err: `smth happened on the server, ${err}` })
        } else {
            res.status(200).json(result)
        }
    })
})

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

eventRouter.post('/events', verifyToken, isAdmin, (req, res) => {
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
        `INSERT INTO rates (user_id, event_id, comment, rating, time) VALUES ("${rate_id}", "${req.user.user_id}", "${event_id}", "${comment}", "${rating}", "${time}")`, (err, result) => {
        if (err) {
            res.status(500).json({ err: `smth happened on the server, ${err}` })
        } else {
            res.status(200).json(result)
        }
    })

})


module.exports = eventRouter;
