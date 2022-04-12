const router = require('express').Router();
const AppError = require('../utils/AppError');
const connection = require('../db')
const { verifyToken, isSuperAdmin, isAdmin } = require('../middleware');
const { v4: uuidv4 } = require('uuid')


router.post('/university', verifyToken, isSuperAdmin, (req, res) => {
    const { numStudents = 0, website = 'https://www.google.com', name = 'N/A', description = 'N/A', address = 'N/A' } = req.body
    const uni_id = uuidv4()

    connection.query(
        `INSERT INTO universities (uni_id,students,website,name,description,address) VALUES ("${uni_id}", "${numStudents}", "${website}", "${name}", "${description}", "${address}")`
        , (err, response) => {
            if (err) {
                res.status(500).json({ err: err })
            } else {
                res.status(200).json({ response: response, err: '' })
            }
        })

    connection.query(`INSERT INTO creates (user_id, uni_id) VALUES ("${req.user.user_id}", "${uni_id}")`)
})


router.get('/university', verifyToken, (req, res) => {
    connection.query('SELECT * FROM universities', (err, result) => {
        if (err) {
            res.status(500).json({ err: `oh no something happened, ${err}` })
        } else {
            res.status(200).json(result)
        }
    });
});


router.post('/rso', verifyToken, isAdmin, (req, res) => {
    const { name, email } = req.body
    connection.query(
        `INSERT INTO rsos (user_id, rso_id, name, email) VALUES ( "${req.user.user_id}", "${uuidv4()}", "${name}", "${email}")`
        , (err, response) => {
            if (err) {
                return res.status(500).json({ err: err })
            } else {
                return res.status(200).json({ response: response, err: '' })
            }
        })
})


module.exports = router
