const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { login, renewToken } = require('../controllers/AuthController');

const router = Router();

router.post('/login', login);

router.get('/renew', validarJWT, renewToken);

module.exports = router;