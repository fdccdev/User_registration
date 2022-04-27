const Router = require('express');
const { check } = require("express-validator");
const { userLogin } =  require('../controllers/auth');
const { validate } = require('../middlewares/validations');

const router = Router();

router.post('/login', [
    check('email', 'El email es requerido!').isEmail(),
    check('password', 'La contraseña es requerida!').not().isEmpty(),
    validate
], userLogin);

module.exports = router;