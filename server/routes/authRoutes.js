const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { verifyToken, isLoggedIn, validateRegister } = require('../middleware')
const catchAsync = require("../utils/catchAsync")
const AppError = require('../utils/AppError')

router.post('/register', validateRegister, (req, res, next) => { });
router.post('/login', (req, res, next) => { })
router.get('/secret-route', verifyToken, (req, res, next) => {
    res.send('This is the secret content. Only logged in users can see that!')
})

module.exports = router;