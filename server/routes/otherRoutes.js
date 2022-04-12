const router = require('express').Router();
const AppError = require('../utils/AppError');
const connection = require('../db')
const { verifyToken, isSuperAdmin } = require('../middleware');
const { v4: uuidv4 } = require('uuid')


router.post('/university', verifyToken, isSuperAdmin, (req, res) => {
    const { numStudents = 0, website = 'https://www.google.com', name = 'N/A', description = 'N/A', address= 'N/A', user_id = 'N/A'} = req.body
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

    connection.query(`INSERT INTO creates (user_id, uni_id) VALUES ("${user_id}", "${uni_id}")`)
})

module.exports = router
