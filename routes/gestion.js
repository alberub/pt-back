const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
const { insertarGestion, estatusGestiones } = require('../controllers/gestion');

const router = Router();

router.post('/crear', validarJWT, insertarGestion );

router.get('/consultaGestiones', validarJWT, estatusGestiones);

module.exports = router;