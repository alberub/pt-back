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

/**
 * @swagger
 * /api/contenidos/crearContenido:
 *   post:
 *     summary: Crea un nuevo contenido
 *     tags: [Contenido]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descripcion
 *               - categoria
 *               - tematica
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título del contenido
 *               descripcion:
 *                 type: string
 *                 description: Descripción del contenido
 *               archivo:
 *                 type: string
 *                 format: binary
 *                 description: Archivo de contenido para cargar (opcional si se proporciona video_url)
 *               video_url:
 *                 type: string
 *                 format: uri
 *                 description: URL del video (opcional si se carga un archivo)
 *               creditos:
 *                 type: string
 *                 description: UID del usuario que creó el contenido
 *               categoria:
 *                 type: string
 *                 description: UID de la categoría asociada
 *               tematica:
 *                 type: string
 *                 description: UID de la temática asociada
 *     responses:
 *       200:
 *         description: Contenido creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Contenido'
 *       500:
 *         description: Error al crear el contenido
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
 *     Contenido:
 *       type: object
 *       required:
 *         - titulo
 *         - descripcion
 *         - url
 *         - creditos
 *         - categoria
 *         - tematica
 *       properties:
 *         _id:
 *           type: string
 *           description: UID del contenido
 *         titulo:
 *           type: string
 *         descripcion:
 *           type: string
 *         url:
 *           type: string
 *           format: uri
 *           description: URL del contenido o archivo cargado
 *         creditos:
 *           type: object
 *           description: datos del usuario que creó el contenido
 *         categoria:
 *           type: object
 *           description: categoria a la que pertenece
 *         tematica:
 *           type: object
 *           description: tematica a la que pertenece
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


router.post('/crearContenido', validarJWT, validarRol('admin', 'creador') , crearContenido);

/**
 * @swagger
 * /api/contenidos/obtener/{categoria}/{tematica}/{order}:
 *   get:
 *     summary: Obtiene contenido filtrado por categoría y temática y ordenado según un criterio
 *     tags: [Contenido]
 *     parameters:
 *       - in: path
 *         name: categoria
 *         required: true
 *         schema:
 *           type: string
 *         description: UID de la categoría para filtrar el contenido
 *       - in: path
 *         name: tematica
 *         required: true
 *         schema:
 *           type: string
 *         description: UID de la temática para filtrar el contenido
 *       - in: path
 *         name: order
 *         required: true
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Orden de los resultados, 'asc' para ascendente o 'desc' para descendente
 *     responses:
 *       200:
 *         description: Lista de contenido filtrada y ordenada
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
 *                     $ref: '#/components/schemas/Contenido'
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
 *     Contenido:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         titulo:
 *           type: string
 *         descripcion:
 *           type: string
 *         url:
 *           type: string
 *           format: uri
 *         creditos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Usuario'
 *         categoria:
 *           type: string
 *         tematica:
 *           type: string
 *         fechaCreacion:
 *           type: string
 *           format: date-time
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


router.get('/obtener/:categoria/:tematica/:order', obtenerContenido); 

/**
 * @swagger
 * /api/contenidos/obtenerContenidoIndividual/{uid}:
 *   get:
 *     summary: Obtiene detalles de un contenido específico por UID
 *     tags: [Contenido]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: UID del contenido a consultar
 *     responses:
 *       200:
 *         description: Información detallada del contenido solicitado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/ContenidoDetallado'
 *       404:
 *         description: Contenido no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
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
 *     ContenidoDetallado:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         titulo:
 *           type: string
 *         descripcion:
 *           type: string
 *         url:
 *           type: string
 *           format: uri
 *         creditos:
 *           type: array
 *           items:
 *             type: string
 *         categoria:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             nombre:
 *               type: string
 *         tematica:
 *           type: string
 *         fechaCreacion:
 *           type: string
 *           format: date-time
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


router.get('/obtenerContenidoIndividual/:uid', validarJWT, validarRol('admin', 'creador'), consultaContenido); 

/**
 * @swagger
 * /api/contenidos/buscar/titulo/{termino}:
 *   get:
 *     summary: Busca contenido por título
 *     tags: [Contenido]
 *     parameters:
 *       - in: path
 *         name: termino
 *         required: true
 *         schema:
 *           type: string
 *         description: Término de búsqueda para el título del contenido
 *     responses:
 *       200:
 *         description: Listado de contenidos que coinciden con el término de búsqueda
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
 *                     $ref: '#/components/schemas/ContenidoBasico'
 *       500:
 *         description: Error en la búsqueda
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
 *     ContenidoBasico:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         titulo:
 *           type: string
 *         descripcion:
 *           type: string
 *         url:
 *           type: string
 *           format: uri
 *         creditos:
 *           type: object
 *           items:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 */


router.get('/buscar/titulo/:termino', buscarContenido); 

/**
 * @swagger
 * /api/contenidos/archivo/{uid}:
 *   get:
 *     summary: Obtiene un contenido específico por UID con detalles completos
 *     tags: [Contenido]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: UID del contenido a consultar
 *     responses:
 *       200:
 *         description: Detalles del contenido solicitado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/ContenidoCompleto'
 *       404:
 *         description: Contenido no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
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
 *     ContenidoCompleto:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         titulo:
 *           type: string
 *         descripcion:
 *           type: string
 *         url:
 *           type: string
 *           format: uri
 *         creditos:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *         categoria:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *         tematica:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *         fechaCreacion:
 *           type: string
 *           format: date-time
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


router.get('/archivo/:uid', validarRol('admin', 'creador', 'lector') ,obtenerContenidoPorId ); 

/**
 * @swagger
 * /api/contenidos/archivo/texto/consulta:
 *   post:
 *     summary: Recupera el contenido de un archivo de texto desde una URL específica
 *     tags: [Archivo]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               urlTexto:
 *                 type: string
 *                 format: uri
 *                 description: URL del archivo de texto a recuperar
 *     responses:
 *       200:
 *         description: Contenido del archivo de texto recuperado
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       500:
 *         description: Error al recuperar el archivo de texto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 error:
 *                   type: string
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


router.post('/archivo/texto/consulta', validarRol('admin', 'creador', 'lector'), obtenerContenidoTexto ); 

/**
 * @swagger
 * /api/contenidos/actualizar:
 *   put:
 *     summary: Actualiza un contenido existente
 *     tags: [Contenido]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - uid
 *               - titulo
 *               - descripcion
 *             properties:
 *               uid:
 *                 type: string
 *                 description: UID del contenido a actualizar
 *               titulo:
 *                 type: string
 *                 description: Nuevo título del contenido
 *               descripcion:
 *                 type: string
 *                 description: Nueva descripción del contenido
 *               archivo:
 *                 type: string
 *                 format: binary
 *                 description: Nuevo archivo de contenido para cargar (opcional si se proporciona video_url)
 *               video_url:
 *                 type: string
 *                 format: uri
 *                 description: Nueva URL del video (opcional si se carga un archivo)
 *     responses:
 *       200:
 *         description: Contenido actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/ContenidoCompleto'
 *       404:
 *         description: Contenido no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 error:
 *                   type: string
 *       500:
 *         description: Error al actualizar el contenido
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
 *     ContenidoCompleto:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         titulo:
 *           type: string
 *         descripcion:
 *           type: string
 *         url:
 *           type: string
 *           format: uri
 *         categoria:
 *           type: string
 *         tematica:
 *           type: string
 *         fechaCreacion:
 *           type: string
 *           format: date-time
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


router.put('/actualizar', validarRol('admin', 'creador'), actualizarContenido);

/**
 * @swagger
 * /api/contenidos/eliminar/{uid}:
 *   delete:
 *     summary: Elimina un contenido específico por UID
 *     tags: [Contenido]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: UID del contenido a eliminar
 *     responses:
 *       200:
 *         description: Contenido eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Contenido'
 *       404:
 *         description: Contenido no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 error:
 *                   type: string
 *       500:
 *         description: Error del servidor al intentar eliminar el contenido
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
 *     Contenido:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         titulo:
 *           type: string
 *         descripcion:
 *           type: string
 *         url:
 *           type: string
 *         categoria:
 *           type: string
 *         tematica:
 *           type: string
 *         fechaCreacion:
 *           type: string
 *         creditos:
 *           type: array
 *           items:
 *             type: string
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


router.delete('/eliminar/:uid', validarRol('admin') , eliminarContenido );

module.exports = router;