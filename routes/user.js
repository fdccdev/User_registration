const { Router } = require('express')
const { check } = require('express-validator')
const {
  usersGet,
  userPut,
  userPost,
  userDelete,
  userPatch
} = require('../controllers/user')

const { validate } = require('../middlewares/validations')
const {
  validateRole,
  verifiedEmail,
  validateUserId
} = require('../helpers/db-validators')
const { jwtvalidate } = require('../middlewares/validateJWT')
const { roleValidate } = require('../middlewares/roleValidate')

const router = Router()

router.get('/', usersGet)

router.post(
  '/',
  [
    check('name', 'El nombre es requerido').not().isEmpty(),
    // check("email", "El email no es valido").isEmail(),
    check('password', 'El password debe ser más de 6 caracteres')
      .not()
      .isEmpty()
      .isLength({ min: 6 }),
    // check("role", "El rol no es válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check('email').custom(verifiedEmail),
    check('role').custom(validateRole),
    validate
  ],
  userPost
)

router.put(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(validateUserId),
    check('role').custom(validateRole),
    validate
  ],
  userPut
)

router.delete(
  '/:id',
  [
    jwtvalidate,
    roleValidate,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(validateUserId),
    validate
  ],
  userDelete
)

router.patch('/', userPatch)

module.exports = router
