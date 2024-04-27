const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    nombre: { type: String, required: true, unique: true, lowercase: true }
});

RoleSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.uid = _id;
    return object;
})

module.exports = model('Role', RoleSchema);