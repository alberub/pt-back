const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { crearUsuario, obtenerUsuarios, obtenerRoles, actualizarUsuario } = require('../controllers/UsuariosController');

const router = Router();

router.post('/crearUsuario', crearUsuario);

router.get('/', validarJWT, obtenerUsuarios);

router.get('/roles', obtenerRoles);

router.put('/actualizar', validarJWT, actualizarUsuario);

module.exports = router;