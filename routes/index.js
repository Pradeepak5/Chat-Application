var express = require('express');
var router = express.Router();
const { login, register, getUser } = require('../controllers/registerController');

/* GET home page. */
router.post('/login', login);
router.post('/register', register);
router.get('/user/:id', getUser);

module.exports = router;
