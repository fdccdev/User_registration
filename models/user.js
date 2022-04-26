const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nomre es requerido']
    },
    email: {
        type: String,
        required: [true, 'El correo es requerido'],        
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es requerido']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: [true, 'El rol es requerido'],
        enum:  ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user;
}


module.exports = model('User', UserSchema);

/*
modelo de esquema de usuario 
{
    name: 'frank',
    email: 'frank@gmail.com',
    password: 'sfasfwertf32',
    img: 'https://user.png',
    state: true
    role: user | admin
    google: true
}
*/