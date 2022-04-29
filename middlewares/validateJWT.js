const { request } = require('express');
const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const jwtvalidate = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No autorizado! - token'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.PUBLICKEYSEC);

        const user = await User.findById(uid);

        if(!user){
            return res.status(401).json({
                msg: 'Token no válido! - usuario no registrado'
            })
        }

        if(!user.state){
            return res.status(401).json({
                msg: 'Token no válido! - usuario no activo'
            })
        }

        req.user = user;

        next();
        
    } catch (error) {  
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido!'
        })   
    }   

};

module.exports = {
    jwtvalidate
}