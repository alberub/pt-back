const { Router } = require('express');
const { validarJWT, verificarAdminRole } = require('../middlewares/validar-jwt');
const { validarRol } = require('../middlewares/validar-rol');

const { crearUsuario, obtenerUsuarios, obtenerRoles, actualizarUsuario } = require('../controllers/UsuariosController');

const router = Router();

/**
 * @swagger
 * /crearUsuario:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 usuario:
 *                   type: object
 *       409:
 *         description: Usuario y/o email no disponible.
 * */

router.post('/crearUsuario', validarJWT, validarRol('admin'), crearUsuario);

/**
 * @swagger
 * /api/usuarios/obtenerUsuarios:
 *   get:
 *     summary: Obtiene una lista de todos los usuarios
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   description: Indica si la respuesta es correcta
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       500:
 *         description: Error al obtener los usuarios
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
 *     User:
 *       type: object
 *       required:
 *         - nombre
 *         - email
 *       properties:
 *         nombre:
 *           type: string
 *         email:
 *           type: string
 *         rol:
 *           type: string
 *       example:
 *         nombre: Juan Perez
 *         email: juanperez@example.com
 *         rol: admin
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


router.get('/obtenerUsuarios', validarJWT, validarRol('admin'), obtenerUsuarios);

router.get('/roles', validarJWT, validarRol('admin'), obtenerRoles);

/**
 * @swagger
 * /actualizar:
 *   put:
 *     summary: Actualiza el rol de un usuario
 *     tags: [Usuarios]
 *     security:
 *       - x-token: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - uid
 *               - role
 *             properties:
 *               uid:
 *                 type: string
 *                 description: El ID único del usuario a actualizar
 *               role:
 *                 type: string
 *                 description: El nuevo rol asignado al usuario
 *     responses:
 *       200:
 *         description: Rol de usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   description: Objeto vacío, ya que no se devuelve información del usuario
 *       404:
 *         description: Datos de entrada inválidos o usuario no encontrado
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
 *         description: Error del servidor al intentar actualizar el usuario
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


router.put('/actualizar', validarJWT, validarRol('admin'), actualizarUsuario);

router.get('/verificarRole', verificarAdminRole, (req, res) => res.send(true));

module.exports = router;