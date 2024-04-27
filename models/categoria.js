const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: { type: String, required: true, unique: true, lowercase: true },
    icono: { type: String, required: true }
    // imagenPortada: { type: String, required: true },
    // tematica: { type: Schema.Types.ObjectId, ref: "Tematica", required: true }
});

CategoriaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.uid = _id;
    return object;
});

module.exports = model('Categoria', CategoriaSchema);

// tematica con imagen

// Categoria solo puede ser del tipo imagen, video o texto

// Contenido pertenece a una tematica y lo filtramos por el tipo de contenido

