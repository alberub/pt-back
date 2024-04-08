const { pool } = require('../database/config'); // Asegúrate de que la ruta es correcta

const insertarGestion = async (req, res) => {
    const { nombre, telefono, simpatizante, comentario, gestor, gestorId, distrito, claveUnica, titular, estatus, telefonoExtra, nombreExtra, direccion } = req.body;

    const query = `
        INSERT INTO ctl_gestiones (
            nombre, telefono, simpatizante, comentario, gestor, gestorId, fecha, distrito, claveUnica, titular, estatus, telefonoExtra, nombreExtra, direccion
        ) VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7, $8, $9, $10, $11, $12, $13);`;
    
    const values = [ nombre, telefono, simpatizante, comentario, gestor, gestorId, distrito, claveUnica, titular, estatus, telefonoExtra, nombreExtra, direccion ];

    try {
        await pool.query(query, values);
        res.json({
            ok: true,
            // registro: resultado.rows[0] Devuelve el registro insertado
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            errorMessage: error.message
        });
    }
};


module.exports = {
    insertarGestion
}