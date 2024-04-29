const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { Error } = require('mongoose');

const validarJWT = (req, res, next) => {
    // Nota: 'Authorization' es el nombre del encabezado HTTP
    const authHeader = req.header('Authorization');
    
    // Se espera que el encabezado de autorización tenga el formato "Bearer token"
    if (!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            ok: false,
            msg:'No hay token en la peticion'
        });
    }

    // Separar el prefijo "Bearer " del token
    const token = authHeader.split(' ')[1];

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token inválido'
        });
    }
};


const verificarAdminRole = async(req, res, next) => {   

    try {

        const authHeader = req.header('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No hay token en la petición' });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.uid
        const user = await User.findById( userId );

        if (!user) {
            return res.status(401).json({
                ok: false, 
                error: 'El usuario no tiene permisos'
            })
        }


        if (user.role === 'admin') {
            next();
        } else{
            throw Error
        }

        
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        })
    }

}

module.exports = {
    validarJWT,
    verificarAdminRole
};