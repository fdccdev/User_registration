const Role = require('../models/role')
const User = require('../models/user')

// validación role desde la base de datos
const validateRole = async (role = '') => {
  const existRole = await Role.findOne({ role })
  if (!existRole) {
    throw new Error(`El rol: ${role} no se encuentra en la base de datos!`)
  }
}

// validación email repetido en la base de datos
const verifiedEmail = async (email) => {
  const emailExist = await User.findOne({ email })
  if (emailExist) {
    throw new Error(`El email: ${email}, ya se encuentra registrado!`)
  }
}

// validación usuario existe en la DB para actualizar
const validateUserId = async (id) => {
  const existUser = await User.findById(id)
  if (!existUser) {
    throw new Error(`El usuario con id: ${id}, no está registrado!`)
  }
}

module.exports = {
  validateRole,
  verifiedEmail,
  validateUserId
}
