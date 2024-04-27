const User = require('../models/user');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res) => {

    try {

        const { username, email } = req.body;
        // const existeUsuario = await User.find({ username, email });
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
            usuario: existeUsuario,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        })
    }

}

module.exports = {
    login
}