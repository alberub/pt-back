const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');

const { crearCategoria, obtenerCategorias, obtenerCategoriaByName, obtenerCategoriaPorId } = require('../controllers/CategoriasController');

const router = Router();

router.use( expressFileUpload({
    useTempFiles : true,
    tempFileDir: '/tmp/'
}));

router.post('/crearCategoria', validarJWT, crearCategoria);

router.get('/obtenerPorNombre/:nombre', validarJWT, obtenerCategoriaByName);

router.get('/obtenerPorId/:uid', validarJWT, obtenerCategoriaPorId);

router.get('/', validarJWT, obtenerCategorias);


module.exports = router;