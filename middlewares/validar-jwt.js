const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { Error } = require('mongoose');

const validarJWT = ( req, res, next ) => {

    const token = req.header('x-token');

     if (!token){
         return res.status(401).json({
             ok: false,
             msg:'No hay token en la peticion'
         });
     }

     try {

        const { uid } = jwt.verify( token, process.env.JWT_SECRET );

        req.uid = uid;

        next();
         
     } catch (error) {

        return res.status(401).json({
            ok:false,
            error:'Token invalido'
        });
         
     }

}

const verificarAdminRole = async(req, res, next) => {

    const token = req.header('x-token');

    try {

        const { uid } = jwt.verify( token, process.env.JWT_SECRET);
        const user = await User.findById( uid );

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