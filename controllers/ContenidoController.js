const Contenido = require('../models/contenido');

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL ); 

const crearContenido = async(req, res) => {

    try {

        let secure_url;      
        const { titulo, descripcion, creditos, categoria, tematica, video_url } = req.body;

        
        if (req.files && req.files.archivo) {
            
            const nombreCortado = req.files.archivo.name.split('.');                         
            const extensionArchivo = nombreCortado [ nombreCortado.length -1];  
            if (extensionArchivo === 'txt') {
                const resultado = await cloudinary.uploader.upload(req.files.archivo.tempFilePath, {resource_type: 'raw'});
                secure_url = resultado.secure_url;
            } else{
                const resultado = await cloudinary.uploader.upload(req.files.archivo.tempFilePath);
                secure_url = resultado.secure_url;
            }
        } else {
            secure_url = video_url;
        }

        let contenido = new Contenido({ titulo, descripcion, url: secure_url, categoria, creditos, tematica });
        contenido = await contenido.save();

        contenido = await Contenido.findById(contenido._id)
            .populate('creditos', 'username')
            .populate('categoria', 'nombre')
            .populate('tematica', 'nombre');

        res.json({
            ok: true,
            data: contenido
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            error: error.message
        });
    }
};


const obtenerContenido = async(req, res) => {

    try {

        const { categoria, tematica, order } = req.params;

        const contenido = await Contenido.find({ categoria: categoria, tematica: tematica })
            .sort([['fechaCreacion', order ]])
            .populate('creditos', 'username');        

        res.json({
            ok: true, 
            data: contenido
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        })
    }

}

const consultaContenido = async(req, res) => {

    try {

        const { uid } = req.params;

        const contenido = await Contenido.findById({ _id: uid }).populate('categoria', 'nombre');

        if(!contenido){
            return res.status(404).json({
                ok: false,
                error: 'El contenido no existe'
            })
        }

        res.json({
            ok: true,
            data: contenido
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        })
    }

}

const actualizarContenido = async(req, res) => {

    try {

        const { uid, titulo, descripcion, video_url } = req.body;

        const existeContenido = await Contenido.findById({ _id: uid });
        console.log(existeContenido);

        if(!existeContenido){
            return res.status(404).json({
                ok: false,
                error: 'El contenido no existe'
            })
        }

        if (req.files && req.files.archivo) {
            const nameArr = existeContenido.url.split('/');
            const name = nameArr[ nameArr.length -1 ];
            const [ public_id ] = name.split('.');
            cloudinary.uploader.destroy( public_id );
        }

        let secure_url;      
        
        if (req.files && req.files.archivo) {
            
            const nombreCortado = req.files.archivo.name.split('.');                         
            const extensionArchivo = nombreCortado [ nombreCortado.length -1];  
            if (extensionArchivo === 'txt') {
                const resultado = await cloudinary.uploader.upload(req.files.archivo.tempFilePath, {resource_type: 'raw'});
                secure_url = resultado.secure_url;
            } else{
                const resultado = await cloudinary.uploader.upload(req.files.archivo.tempFilePath);
                secure_url = resultado.secure_url;
            }
        } else {
            secure_url = video_url;
        }
        
        const contenido = await Contenido.findByIdAndUpdate( uid, { titulo, descripcion, url: secure_url }, { new : true });    

        res.json({
            ok: true,
            data: contenido
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        })
    }

}

const buscarContenido = async(req, res) => {

    try {

        const termino = req.params.termino;
        const regex = new RegExp( termino , 'i'); 

        const contenido = await Contenido.find({ 'titulo': regex })
        .populate('creditos', 'username')  ;

        res.json({
            ok: true,
            data: contenido
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: 'falla la busqueda'
        })
    }

}

const obtenerContenidoPorId = async(req, res) => {

    try {

        const uid = req.params.uid;

        const contenido = await Contenido.findById({ _id: uid })
                                         .populate('creditos', 'username email')
                                         .populate('categoria', 'nombre' )
                                         .populate('tematica', 'nombre')

        if (!contenido) {
            return res.status(404).json({
                ok: false,
                error: 'No se ha encontrado el contenido'
            })
        }

        res.json({
            ok: true,
            data: contenido
        })

        
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        })
    }

}

const obtenerContenidoTexto = async( req, res ) => {

    try {
        const urlTexto = req.body.urlTexto;
        const url = `${urlTexto}`;
        
        const response = await fetch(url);
        const data = await response.text();

        res.send(data);
    } catch (error) {
        console.error('Error al recuperar el archivo de texto:', error);
        res.status(500).send('Error al recuperar el archivo de texto');
    }

}

const eliminarContenido = async( req, res ) => {

    try {

        const id = req.params.uid;

        const contenido = await Contenido.findByIdAndDelete({ _id: id });

        res.json({
            ok: true,
            data: contenido
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        })
    }

}

module.exports = {
    actualizarContenido,
    buscarContenido,
    consultaContenido,
    crearContenido,
    eliminarContenido,
    obtenerContenido,
    obtenerContenidoPorId,
    obtenerContenidoTexto
}