const { response } = require('express')

const roleValidate = (req, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: 'Se debe verificar el role del usuario.'
    })
  }

  const { role } = req.user

  if (role !== 'ADMIN_ROLE') {
    return res.json({
      msg: 'No tiene privilegios para modificar registros!'
    })
  }

  next()
}

module.exports = {
  roleValidate
}
