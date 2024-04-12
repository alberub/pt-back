const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const { obtenerPaginasPorUsuario } = require('../controllers/paginado');

const router = Router();

router.get('/paginas', validarJWT, obtenerPaginasPorUsuario );

module.exports = router;