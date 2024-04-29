const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRol } = require('../middlewares/validar-rol');

const { crearTematica, obtenerTematicas, buscarTematica, obtenerTematicaPorId } = require('../controllers/TematicaController');

const router = Router();

router.use( expressFileUpload({
    useTempFiles : true,
    tempFileDir: '/tmp/'
}));

/**
 * @swagger
 * /api/tematicas/crearTematica:
 *   post:
 *     summary: Crea una nueva temática
 *     tags: [Tematica]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la temática
 *               archivos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Arreglo de UIDs de categorías asociadas a la temática
 *               imagen:
 *                 type: string
 *                 format: binary
 *                 description: Imagen de portada de la temática
 *     responses:
 *       200:
 *         description: Temática creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tematica'
 *       500:
 *         description: Error del servidor al intentar crear la temática
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
 *     Tematica:
 *       type: object
 *       required:
 *         - nombre
 *         - archivos
 *         - portada
 *       properties:
 *         _id:
 *           type: string
 *           description: uid de la temática
 *         nombre:
 *           type: string
 *         archivos:
 *           type: array
 *           items:
 *             type: string
 *           description: UIDs de categorías asociadas
 *         portada:
 *           type: string
 *           format: uri
 *           description: URL de la imagen de portada
 *       example:
 *         nombre: "Ciencias"
 *         archivos: ["602c8c180fb47e8e4c8b8abc", "602c8c1e0fb47e8e4c8b8abe"]
 *         portada: "https://example.com/imagen.*"
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */



router.post('/crearTematica', validarJWT, validarRol('admin'), crearTematica);

/**
 * @swagger
 * /api/tematicas/obtenerTematicas:
 *   get:
 *     summary: Obtiene todas las temáticas disponibles
 *     tags: [Tematica]
 *     responses:
 *       200:
 *         description: Listado temáticas disponibles
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
 *                     $ref: '#/components/schemas/Tematica'
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
 *     Tematica:
 *       type: object
 *       required:
 *         - nombre
 *         - archivos
 *         - portada
 *       properties:
 *         _id:
 *           type: string
 *           description: UID de la temática
 *         nombre:
 *           type: string
 *         archivos:
 *           type: array
 *           items:
 *             type: string
 *           description: UIDs de categorías asociadas
 *         portada:
 *           type: string
 *           format: uri
 *           description: URL de la imagen de portada
 *       example:
 *         nombre: "Ciencias"
 *         archivos: ["602c8c180fb47e8e4c8b8abc", "602c8c1e0fb47e8e4c8b8abe"]
 *         portada: "https://example.com/imagen.*"
 */


router.get('/obtenerTematicas', obtenerTematicas);

/**
 * @swagger
 * /api/tematicas/buscar/{termino}:
 *   get:
 *     summary: Busca temáticas que coincidan con el término proporcionado
 *     tags: [Tematica]
 *     parameters:
 *       - in: path
 *         name: termino
 *         required: true
 *         schema:
 *           type: string
 *         description: Trmino de búsqueda
 *     responses:
 *       200:
 *         description: Listado de temáticas que coinciden con el término de búsqueda
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
 *                     $ref: '#/components/schemas/Tematica'
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
 *     Tematica:
 *       type: object
 *       required:
 *         - nombre
 *         - archivos
 *         - portada
 *       properties:
 *         _id:
 *           type: string
 *           description: UID de la temática
 *         nombre:
 *           type: string
 *         archivos:
 *           type: array
 *           items:
 *             type: string
 *           description: UIDs de categorías asociadas
 *         portada:
 *           type: string
 *           format: uri
 *           description: URL de la imagen de portada
 *       example:
 *         nombre: "Ciencias"
 *         archivos: ["602c8c180fb47e8e4c8b8abc", "602c8c1e0fb47e8e4c8b8abe"]
 *         portada: "https://example.com/imagen.*"
 */


router.get('/buscar/:termino', buscarTematica);

/**
 * @swagger
 * /api/tematicas/buscarPorId/{id}:
 *   get:
 *     summary: Obtiene una temática por su UID y el conteo de contenidos por categoría
 *     tags: [Tematica]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El UID de la temática a buscar
 *     responses:
 *       200:
 *         description: Detalles de la temática y conteo de contenidos por categoría
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     tematica:
 *                       $ref: '#/components/schemas/TematicaDetallada'
 *                     conteo:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           categoria:
 *                             $ref: '#/components/schemas/Categoria'
 *                           count:
 *                             type: integer
 *                             description: Número de contenidos en esta categoría
 *       404:
 *         description: No se encontró la temática con el UID proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
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
 *     TematicaDetallada:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: UID único de la temática
 *         nombre:
 *           type: string
 *         archivos:
 *           type: array
 *           items:
 *             type: string
 *           description: UIDs de categorías asociadas
 *         portada:
 *           type: string
 *           format: uri
 *           description: URL de la imagen de portada
 *         permite:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Categoria'
 *     Categoria:
 *       type: object
 *       properties:
 *         uid:
 *           type: string
 *           description: UID único de la categoría
 *         nombre:
 *           type: string
 *         icono:
 *           type: string
 *       example:
 *         uid: "602c8c180fb47e8e4c8b8abc"
 *         nombre: "Ciencias"
 *         icono: "https://example.com/icon.png"
 */


router.get('/buscarPorId/:id', obtenerTematicaPorId);

module.exports = router;