const eventRouter = require('express').Router();
const { verifyToken, isAdmin, isSpecificAdmin } = require('../middleware');
const AppError = require('../utils/AppError');
const connection = require('../db')


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
    const { date_time, category, phone, email, name, type_of, description, start_time } = req.body
    connection.query(
        `INSERT INTO events (event_id, date_time, category, phone, email, name, type_of, description, start_time) VALUES ("${uuidv4()}", "${date_time}", "${category}", "${phone}", "${email}, ${name}, ${type_of}, ${description}, ${start_time}")`
        , (err, response) => {
            if (err) {
                return res.status(500).json({ err: err })
            } else {
                return res.status(200).json({ response: response, err: '' })
            }
        })
})

eventRouter.put('/events/:event_id', verifyToken, isAdmin, isSpecificAdmin, (req, res) => {
    const { date_time, category, phone, email, name, type_of, description, start_time } = req.body
    connection.query(
        `UPDATE events SET date_time="${date_time}", category="${category}", phone="${phone}", email="${email}", name="${name}", type_of="${type_of}", description="${description}", start_time="${start_time}" WHERE event_id="${req.params.event_id}"`
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




module.exports = eventRouter;