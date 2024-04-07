const { Pool } = require('pg');

// Configuración de la conexión a la base de datos sin usuario ni contraseña
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'practicas',
    port: 5432,
  });

// Función para probar la conexión y hacer una consulta simple
async function probarConexion() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log("La hora actual en el servidor PostgreSQL es:", res.rows[0].now);
    
  } catch (err) {
    console.error('Ocurrió un error al conectar a PostgreSQL:', err);
  }
}

module.exports = {
    probarConexion,
    pool
}





// const mongoose = require('mongoose');

// const dbConnection = async () => {

//     try {

//         await mongoose.connect( process.env.DB_CNN, {
//             useNewUrlParser: true, 
//             useUnifiedTopology: true,
//             useCreateIndex: true
//         });

//         console.log('DB online DB');
        
//     } catch (error) {

//         console.log(error);
//         throw new Error('Error al iniciar la base de datos');
        
//     }

// }

// module.exports = {
//     dbConnection
// }