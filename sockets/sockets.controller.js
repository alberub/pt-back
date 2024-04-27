const { comprobarJWT } = require("../helpers/jwt");

const socketController = async(socket, io) => {

    // const user = await comprobarJWT( socket.handshake.headers['x-token'] );    

    // if( !user ){        
    //     console.log('no hay user');
    //     return socket.disconnect();
    // }
    
    
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