const { Schema, model } = require('mongoose');

const TematicaSchema = Schema({
    nombre: { type: String, required: true, unique: true, lowercase: true },    
    permite: [{ type: Schema.Types.ObjectId, ref: "Categoria" , required: true }],
    portada:{ type: String, required: true }
});

TematicaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.uid = _id;
    return object;
})

module.exports = model('Tematica', TematicaSchema);