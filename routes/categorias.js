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

/**
 * @swagger
 * /api/categorias/crearCategoria:
 *   post:
 *     summary: Crea una nueva categoría con un icono
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - icono
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la nueva categoría
 *               icono:
 *                 type: string
 *                 format: binary
 *                 description: Archivo de imagen para el icono de la categoría, se usa solo como referencia
 *     responses:
 *       200:
 *         description: Categoría creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 newCategoria:
 *                   $ref: '#/components/schemas/Categoria'
 *       500:
 *         description: Error del servidor al intentar crear la categoría
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 error:
 *                   type: string
 * components:
 *   schemas:
 *     Categoria:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         nombre:
 *           type: string
 *         icono:
 *           type: string
 *           format: uri
 *           description: URL del icono de la categoría
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


router.post('/crearCategoria', validarJWT, validarRol('admin') , crearCategoria);

router.get('/obtenerPorNombre/:nombre', validarJWT, obtenerCategoriaByName); //******* */

router.get('/obtenerPorId/:uid', obtenerCategoriaPorId); //******* */

/**
 * @swagger
 * /api/categorias/obtenerCategorias:
 *   get:
 *     summary: Obtiene las categorías disponibles
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listado de categorías disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Categoria'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 error:
 *                   type: string
 * components:
 *   schemas:
 *     Categoria:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         nombre:
 *           type: string
 *         icono:
 *           type: string
 *           format: uri
 *           description: URL del icono de la categoría
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


router.get('/obtenerCategorias', validarJWT, obtenerCategorias);


module.exports = router;