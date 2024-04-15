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

const estatusGestiones = async(req, res) => {

    try {
        const query = `SELECT
                            COUNT(*) AS total_gestiones,
                            COUNT(CASE WHEN simpatizante = true THEN 1 END) AS total_simpatizantes,
                            COUNT(CASE WHEN estatus IN ('Contesta', 'Indeciso', 'Quiere visita de Maderito', 'Número equivocado', 'No le interesa', 'No es de Monterrey') THEN 1 END) AS total_estatus_especificos
                       FROM ctl_gestiones;`

        const result = await pool.query(query);

        res.json({
            ok: true,
            datos: result.rows
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            errorMessage: error.message
        });
    }
}

module.exports = {
    insertarGestion,
    estatusGestiones
}