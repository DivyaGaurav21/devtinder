const express = require('express');
const { register , signIn } = require('../controllers/authController');



const router = express.Router();

router.post('/signup', register);
router.post('/signin', signIn);

module.exports = router;