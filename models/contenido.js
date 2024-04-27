const { Schema, model } = require('mongoose');

const ContenidoSchema = Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String },
    url: { type: String },
    fechaCreacion: { type: Date, default: Date.now },
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria' },
    creditos: { type: Schema.Types.ObjectId, ref: 'User' },
    tematica: { type: Schema.Types.ObjectId, ref: 'Tematica' }
});

ContenidoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.uid = _id;
    return object;
});

module.exports = model('Contenido', ContenidoSchema);