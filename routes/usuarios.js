const { Router } = require('express');
const { check } = require('express-validator');
const { ValidarAdmin } = require('../middlewares/validar-admin');

const { validarJWT } = require('../middlewares/validar-jwt');
const { crearUsuario, validar, esAdmin, rutas } = require('../controllers/usuarios');

const router = Router();

router.post('/nuevo', validarJWT, crearUsuario );

router.post('/admin', validarJWT, esAdmin );

router.post('/rutas', validarJWT, ValidarAdmin, rutas);

// router.post('/validar', validar );

module.exports = router;