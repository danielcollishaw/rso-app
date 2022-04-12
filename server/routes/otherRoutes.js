const router = require('express').Router();
const AppError = require('../utils/AppError');
const connection = require('../db')
const { verifyToken, isSuperAdmin } = require('../middleware');
const { v4: uuidv4 } = require('uuid')


router.post('/university', verifyToken, isSuperAdmin, (req, res) => {
    const { numStudents = 0, website = 'https://www.google.com', name = 'N/A', description = 'N/A', address= 'N/A' } = req.body
    connection.query(
        `INSERT INTO universities (uni_id,students,website,name,description,address) VALUES ("${uuidv4()}", "${numStudents}", "${website}", "${name}", "${description}", "${address}")`
        , (err, response) => {
            if (err) {
                return res.status(500).json({ err: err })
            } else {
                return res.status(200).json({ response: response, err: '' })
            }
        })
})

module.exports = router
