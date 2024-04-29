const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Role = require('../models/roles');

const validarRol = (...rolesPermitidos) => {
    return async (req, res, next) => {
        try {
            const authHeader = req.header('Authorization');

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'No hay token en la petición' });
            }

            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.uid;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(401).json({ message: 'No autorizado - Usuario no encontrado' });
            }

            const role = await Role.findOne({ nombre: user.role });
            if (!role) {
                return res.status(401).json({ message: 'Rol no encontrado' });
            }

            if (!rolesPermitidos.includes(role.nombre)) {
                return res.status(403).json({ message: 'No tiene permisos para realizar esta acción' });
            }

            next();
        } catch (error) {
            res.status(500).json({ message: 'Error de autenticación' });
        }
    };
};


module.exports = {
    validarRol
}