const { pool } = require('../database/config');

const obtenerPaginasPorUsuario = async (req, res) => {

    const { gestor } = req.query;

    try {
        const query = 'SELECT CEIL(COUNT(*)::INTEGER / 10.0) * 1 AS paginas FROM ctl_padron WHERE gestor = $1';
        const values = [ gestor ];

        const resultado = await pool.query(query, values);

        res.json({
            ok: true,
            pages: parseInt(resultado.rows[0].paginas)
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            errorMessage: error.message
        });
    }

}

module.exports = {
    obtenerPaginasPorUsuario
}