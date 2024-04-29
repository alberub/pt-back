const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRol } = require('../middlewares/validar-rol');

const { crearCategoria, obtenerCategorias, obtenerCategoriaByName, obtenerCategoriaPorId } = require('../controllers/CategoriasController');

const router = Router();

router.use( expressFileUpload({
    useTempFiles : true,
    tempFileDir: '/tmp/'
}));

router.post('/crearCategoria', validarJWT, validarRol('admin') , crearCategoria);

router.get('/obtenerPorNombre/:nombre', validarJWT, obtenerCategoriaByName); //******* */

router.get('/obtenerPorId/:uid', obtenerCategoriaPorId); //******* */

router.get('/', validarJWT, obtenerCategorias);


module.exports = router;