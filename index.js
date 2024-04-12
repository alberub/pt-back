const express = require('express');
require( 'dotenv' ).config();

const path = require('path');
const cors = require('cors');

const { probarConexion } = require('./database/config');

const app = express();
const server = require('http').createServer( app );

app.use( cors() );

app.use( express.json() );

probarConexion();

// Directorio publico

app.use(express.static('public')); 

app.use( '/api/login', require('./routes/auth') );

app.use( '/api/padron', require('./routes/padron') );

app.use( '/api/gestion', require('./routes/gestion') );

app.use( '/api/paginado', require('./routes/paginado') );

app.use( '/api/usuarios', require('./routes/usuarios') );

// app.use( '/api/followings', require('./routes/followings') )

// app.use( '/api/login', require('./routes/auth') );

// app.use( '/api/search', require('./routes/busqueda') );

app.get( '*', ( req, res ) => {
    res.sendFile( path.resolve(__dirname, './public/index.html') )
});

server.listen( process.env.PORT, () => {
    console.log('Servidor ( server - socket io ) corriendo en puerto ' + process.env.PORT);
});