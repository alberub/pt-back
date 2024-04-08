const { pool } = require('../database/config');

const obtenerPaginasPorUsuario = async (req, res) => {

    const { gestorId } = req.query;

    try {
        const query = 'SELECT CEIL(COUNT(*)::INTEGER / 10.0) * 1 AS paginas FROM ctl_padron WHERE gestorId = $1';
        const values = [ gestorId ];

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