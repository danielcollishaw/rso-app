const eventRouter = require('express').Router();
const { verifyToken } = require('../middleware');
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




module.exports = eventRouter;