const User = require('../models/user');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res) => {

    try {

        const { username, email } = req.body;        
        const existeUsuario = await User.findOne({
            $and: [{ username: username }, { email: email }]
        });

        if (!existeUsuario) {
            return res.status(404).json({
                ok: false,
                error: 'No existe el usuario'
            });
        }

        const token = await generarJWT( existeUsuario.id );

        res.json({
            ok: true,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        })
    }

}

const renewToken = async( req, res ) => {

    try {
        
        const uid = req.uid;

        // Generar JWT
        const token = await generarJWT( uid );

        const usuario = await User.findOne({ _id: uid });

        if (!usuario) {
            return res.json({
                ok: false, 
                error: 'Ha ocurrido un error al realizar la petición.'
            })
        }

        res.json({
            ok: true,
            token,
            usuario
        });

    } catch (error) {
        res.status(500).json({
            ok: false, 
            error: error.message
        })
    }

}

module.exports = {
    login,
    renewToken
}