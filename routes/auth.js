const { Router } = require('express');

const { login } = require('../controllers/AuthController');

const router = Router();

router.post('/login', login);

module.exports = router;