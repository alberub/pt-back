const { pool } = require('../database/config'); // Asegúrate de que la ruta es correcta

const obtenerDatos = async (req, res) => { 
    // Cambio: recibir parámetros de consulta en vez de cuerpo de la solicitud
    const { gestor, limit, page } = req.query; // valores predeterminados para limit y page
    // const nombreUp = nombre.toUpperCase();

    const offset = (page - 1) * limit; // Calcula el desplazamiento (offset) basado en el número de página y límite

    try {
        // Modificación de la consulta para soportar la paginación
        const query = 'SELECT * FROM ctl_padron WHERE gestor = $1 LIMIT $2 OFFSET $3';
        const values = [ gestor, limit, offset ];

        const resultado = await pool.query(query, values);

        res.json({
            ok: true,
            datos: resultado.rows,
            page, // devuelve el número de página actual
            limit // devuelve el límite de resultados por página
        });
    } catch (error) {        
        res.status(500).json({
            ok: false,
            errorMessage: error.message
        });
    }
};

module.exports = {
    obtenerDatos
};
