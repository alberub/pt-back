const express = require('express');
require( 'dotenv' ).config();

const path = require('path');
const cors = require('cors');

const { connection } = require('./database/config');
const { socketController } = require('./sockets/sockets.controller')

const app = express();
const server = require('http').createServer( app );

const io = require('socket.io')(server,{
    cors:{
        origin: true,
        credentials: true
    }
});

app.use( cors() );

app.use( express.json() );

connection();

// Directorio publico

app.use(express.static('public')); 

app.use('/api/usuarios', require('./routes/usuarios'));

app.use('/api/tematicas', require('./routes/tematicas'));

app.use('/api/categorias', require('./routes/categorias'));

app.use('/api/contenidos', require('./routes/contenidos'))

app.use('/api/auth', require('./routes/auth'));

app.get( '*', ( req, res ) => {
  res.sendFile( path.resolve(__dirname, './public/index.html') )
});

io.on('connection', ( socket ) => {
  socketController( socket, io);        
}); 

server.listen( process.env.PORT, () => {
  console.log('Servidor ( server - socket io ) corriendo en puerto ' + process.env.PORT);
});