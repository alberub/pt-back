const bcrypt = require('bcryptjs');
const { response } = require('express');
const { generarJWT } = require('../helpers/jwt');
const { pool } = require('../database/config');
const Usuario  = require('../models/usuario');
const { validarComplejidadContrasenia } = require('../helpers/validar-password');

const crearUsuario = async (req, res) => {

    const { usuario, password } = req.body;

    try {

        const resultadoValidacion = validarComplejidadContrasenia(password);
        if (!resultadoValidacion.esValida) {
            return res.status(400).json({
                ok: false,
                errorMessage: resultadoValidacion.errores
            })
        }

        const usuarioMin = usuario.toLowerCase();
        const query = 'SELECT EXISTS ( SELECT 1 FROM cat_gestores WHERE usuario = $1) AS existe;';
        const values = [usuarioMin];

        const existeUsuario = await pool.query(query, values);
        if (existeUsuario.rows[0].existe) {
            return res.status(400).json({
                ok: false,
                errorMessage: 'El nombre de usuario no se encuentra disponible.'
            });
        };

        const nuevoUsuario = new Usuario(usuarioMin, password);

        const salt = bcrypt.genSaltSync();
        nuevoUsuario.password = bcrypt.hashSync( password, salt );

        const queryNew = 'INSERT INTO cat_gestores(usuario, password) values($1, $2) RETURNING usuario';
        const valuesNew = [ nuevoUsuario.usuario, nuevoUsuario.password ];

        const resultado = await pool.query(queryNew, valuesNew);

        res.json({
            ok: true,
            datos: `Se ha creado el usuario ${resultado.rows[0].usuario}`
        })
        
    } catch (error) {
        res.json({
            ok: false,
            errorMessage: error.message
        })
    }

}

module.exports = {
    crearUsuario
}