const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const { insertarGestion } = require('../controllers/gestion');

const router = Router();

// router.get( '/', obtenerDatos );

router.post('/gestion', insertarGestion );

// router.post('/gestion', [ validarCampos,validarJWT ], getSubscribers );

// router.get( '/:id', validarJWT, getUsuarioById );

// router.get('/:validate/:tipo', validarCampos, validateRegistryData );

// router.get('/profile/pending/notifications', validarJWT, pendingNotification );

// router.post('/notifications',
//     [ 
//         validarCampos,
//         validarJWT 
//     ], 
//     getNotifications );

// router.post( '/',       
//     [
//         check('firstName', 'El firstName es obligatorio').not().isEmpty(),
//         check('username', 'El username es obligatorio').not().isEmpty(),
//         check('email', 'El email es obligatorio').isEmail(),
//         check('password', 'La contrasena es obligatoria').not().isEmpty(),        
//         validarCampos,
//     ],
//     crearUsuario );

module.exports = router;