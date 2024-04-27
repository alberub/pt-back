const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    role: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    fechaCreacion: { 
        type: Date, 
        default: Date.now 
    }

});

UserSchema.method('toJSON', function(){
    
    const { __v, _id, ...object } = this.toObject();

    object.uid = _id;
    return object;

});

module.exports = model('User', UserSchema);