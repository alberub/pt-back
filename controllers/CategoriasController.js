const Categoria = require('../models/categoria');

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL ); 

const crearCategoria = async(req, res) => {

    try {                
    
        if (!req.files.icono || Object.keys(req.files).length === 0) {
            return res.status(400).send('No se han cargado archivos.');
        }
                  
        let imagen = req.files.icono;
        let nombre = req.body.nombre;        
                                          
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
        
        // const categoria = new Categoria({ nombre, imagenPortada: secure_url, tematica });
        const categoria = new Categoria({ nombre, icono: secure_url });
        const newCategoria = await categoria.save();

        res.json({
            ok: true,
            newCategoria
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        })
    }

}

const obtenerCategorias = async(req, res) => {

    try {
        const categorias = await Categoria.find({});

        res.json({
            ok: true,
            data: categorias
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        })
    }

}

const obtenerCategoriasPorTematica = async(req, res) => {

    try {

        const tematicaId = req.params.tematicaId;

        
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        })
    }

}

const obtenerCategoriaByName = async(req, res) => {

    try {

        const nombre = req.params.nombre;

        const categoria = await Categoria.find({ nombre: nombre });

        if (!categoria) {
            return res.status(404).json({
                ok: false,
                error: 'No existe la categría'
            })
        }

        res.json({
            ok: true,
            data: categoria
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        })
    }

}

const obtenerCategoriaPorId = async(req, res) => {

    try {

        const uid = req.params.uid;

        const categoria = await Categoria.find({ _id: uid });

        if (!categoria) {
            return res.status(404).json({
                ok: false,
                error: 'No existe la categría'
            })
        }

        res.json({
            ok: true,
            data: categoria
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        })
    }

}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaByName,
    obtenerCategoriaPorId,
    obtenerCategoriasPorTematica
}