const User = require('../models/user');
const Role = require('../models/roles');

const crearUsuario = async(req, res) => {
    
    // TODO: lowercase para verificar que no exista el usuario
    try {

        const { username, email, role } = req.body;

        const existeUsuario = await User.findOne({
            $and: [{ username: username }, { email: email }]
        });

        if (existeUsuario) {
            return res.status(409).json({
                ok: false,
                error: 'Usuario y/o email no disponible.'
            });
        }

        const user = new User({username, email, role});

        const newUser = await user.save();

        res.json({
            ok: true,
            newUser
        })

        
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        })
    }
}

const obtenerUsuarios = async(req, res) => {

    try {

        const usuarios = await User.find({});

        res.json({
            ok: true,
            data: usuarios
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        })
    }

}

const actualizarUsuario = async(req, res) => {

    const { uid, role } = req.body;

    try {

        await User.findByIdAndUpdate( uid, { role: role } );

        res.json({
            ok: true,
            data: null
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        })
    }

}

const obtenerRoles = async(req, res) => {

    try {

        const roles = await Role.find({});

        res.json({
            ok: true,
            data: roles
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        })
    }

}

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    obtenerRoles,
    actualizarUsuario
}