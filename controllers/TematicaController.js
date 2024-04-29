const Tematica = require('../models/tematica');
const Contenido = require('../models/contenido');

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

      const tematica = await Tematica.findById( id )
                                     .populate('permite', 'icono nombre uid')
                                     .exec()

      if (!tematica) {
        return res.status(404).json({
          error: `No se ha encontrado la temática con id ${id}`
        })
      }
    
    const conteo = await Contenido.aggregate([
      { $match: { tematica: tematica._id } },
      { $group: { _id: "$categoria", count: { $sum: 1 } } }
    ]);
    
    const categoriasConteo = tematica.permite.map(cat => ({
      categoria: cat,
      count: (conteo.find(c => c._id.toString() === cat._id.toString()) || { count: 0 }).count
    }));

    res.json({
      ok: true,
      data: {
        tematica: tematica,
        conteo: categoriasConteo
      }
      });
      
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