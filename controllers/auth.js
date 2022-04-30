const { response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const { generateJWT } = require('../helpers/token')

const userLogin = async (req, res = response) => {
  const { email, password } = req.body

  try {
    //  verificar email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - Correo!'
      })
    }

    //  user activo en database
    if (!user.state) {
      return res.status(400).json({
        msg: 'Usuario no se encuentra en los registros!'
      })
    }
    //  verificar contraseña
    const validPass = bcryptjs.compareSync(password, user.password)
    if (!validPass) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - Password!'
      })
    }

    //  crear token
    const token = await generateJWT(user.id)

    res.status(200).json({
      user,
      token
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      error: 'Error en la petición'
    })
  }
}

module.exports = {
  userLogin
}
