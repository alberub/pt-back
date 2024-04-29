const { comprobarJWT } = require("../helpers/jwt");

const socketController = async(socket, io) => {

    // const authHeader = req.header('Authorization');

    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //     return res.status(401).json({ message: 'No hay token en la petición' });
    // }

    // const token = authHeader.split(' ')[1];
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    
    socket.on('contenido-creado', (data) => {
        socket.broadcast.emit('nuevo-contenido', { ok: true, data})
    })

    // socket.join( user.id );


    socket.on('disconnect', () => {    
    });
}

module.exports = {
    socketController
}