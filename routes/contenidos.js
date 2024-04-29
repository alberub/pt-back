const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRol } = require('../middlewares/validar-rol');

const { crearContenido, obtenerContenido, consultaContenido, actualizarContenido, buscarContenido, obtenerContenidoPorId, obtenerContenidoTexto, eliminarContenido } = require('../controllers/ContenidoController');

const router = Router();

router.use( expressFileUpload({
    useTempFiles : true,
    tempFileDir: '/tmp/'
}));

router.post('/crearContenido', validarJWT, validarRol('admin', 'creador') , crearContenido);

router.get('/obtener/:categoria/:tematica/:order', obtenerContenido); //este si se usa

router.get('/:uid', validarJWT, validarRol('admin', 'creador'), consultaContenido);

router.get('/buscar/titulo/:termino', validarRol('admin', 'creador', 'lector'), buscarContenido);

router.get('/archivo/:uid', validarRol('admin', 'creador', 'lector') ,obtenerContenidoPorId );

router.post('/archivo/texto/consulta', validarRol('admin', 'creador', 'lector'), obtenerContenidoTexto );

router.put('/actualizar', validarJWT, validarRol('admin', 'creador'), actualizarContenido);

router.delete('/eliminar/:uid', validarRol('admin') , eliminarContenido );

module.exports = router;