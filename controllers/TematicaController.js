const Tematica = require('../models/tematica');

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL ); 

const crearTematica = async(req, res) => {

    const { nombre, archivos } = req.body;

    try {

      if (!req.files.imagen || Object.keys(req.files).length === 0) {
        return res.status(400).send('No se han cargado archivos.');
      }

      let tematica = await Tematica.findOne({ nombre });
      if (tematica) {
        return res.status(400).json({ 
            msg: 'La temática ya existe.'
        });
      }

      let imagen = req.files.imagen;

      const nombreCortado = imagen.name.split('.');                         
      const extensionArchivo = nombreCortado [ nombreCortado.length -1];  
  
      // Validar extension
  
      const extensionValida = ['gif','png', 'jpg', 'jpeg', 'webp'];
  
      if( !extensionValida.includes( extensionArchivo) ){
          return res.status(400).json({
              ok: false,
              msg:'No es una extension valida'
          });
      }

      var { secure_url } = await cloudinary.uploader.upload( imagen.tempFilePath );
  
      tematica = new Tematica({
        nombre,
        permite: archivos,
        portada: secure_url
      });

      await tematica.save();
  
      res.json(tematica);

    } catch (error) {
      res.status(500).json({
        ok: false,
        error: error.message
      });
    }

}

const obtenerTematicas = async(req, res) => {

    try {

      const tematicas = await Tematica.find({});
      
      res.json({
        ok: true,
        data: tematicas
      })
      
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        })
    }

}

const obtenerTematicaPorId =  async(req, res) => {

    try {

      const id = req.params.id;

      const tematica = await Tematica.find({ _id: id });

      if (!tematica) {
        return res.status(404).json({
          error: 'No se ha encontrado la temática.'
        })
      }

      res.json({
        ok: true,
        data: tematica
      })
      
    } catch (error) {
      res.status(500).json({
          ok: false,
          error: error.message
      })
  }

}

const buscarTematica = async(req, res) => {

  try {

      const termino = req.params.termino;
      const regex = new RegExp( termino , 'i'); 

      const tematica = await Tematica.find({ 'nombre': regex });

      res.json({
          ok: true,
          data: tematica
      })
      
  } catch (error) {
      res.status(500).json({
          ok: false,
          error: error.message
      })
  }

}

module.exports = {
    crearTematica,
    obtenerTematicas,
    obtenerTematicaPorId,
    buscarTematica
}