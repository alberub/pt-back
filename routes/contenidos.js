const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRol } = require('../middlewares/validar-rol');

const { crearContenido, obtenerContenido, consultaContenido, actualizarContenido, buscarContenido, obtenerContenidoPorId, obtenerContenidoTexto } = require('../controllers/ContenidoController');

const router = Router();

router.use( expressFileUpload({
    useTempFiles : true,
    tempFileDir: '/tmp/'
}));

router.post('/crearContenido', validarJWT, validarRol('admin', 'creador') , crearContenido);

router.get('/:categoria/:tematica/:order', obtenerContenido);

router.get('/:uid', validarJWT, consultaContenido);

router.put('/actualizar', validarJWT, actualizarContenido);

router.get('/buscar/titulo/:termino', buscarContenido);

router.get('/archivo/:uid', obtenerContenidoPorId );

router.post('/archivo/texto/consulta', obtenerContenidoTexto)

module.exports = router;