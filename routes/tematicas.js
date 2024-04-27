const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');

const { crearTematica, obtenerTematicas, buscarTematica, obtenerTematicaPorId } = require('../controllers/TematicaController');

const router = Router();

router.use( expressFileUpload({
    useTempFiles : true,
    tempFileDir: '/tmp/'
}));

router.post('/crearTematica', validarJWT, crearTematica);

router.get('/', obtenerTematicas);

router.get('/buscar/:termino', buscarTematica);

router.get('/buscarPorId/:id', obtenerTematicaPorId);

module.exports = router;