const { response } = require('express')
const byc = require('bcryptjs')

const User = require('../models/user')

const usersGet = async (req, res = response) => {
  const params = req.query
  const { limit = 0, skip = 0 } = params

  // request simultaneas tiempo en ms reducidos
  const [users, records] = await Promise.all([
    User.find({ state: true }).limit(limit).skip(skip),
    User.countDocuments({ state: true })
  ])

  res.status(200).json({
    users,
    records
  })
}

const userPut = async (req, res = response) => {
  const id = req.params.id
  const { _id, email, password, google, ...data } = req.body

  if (password) {
    // encriptar password update
    const salt = byc.genSaltSync()
    data.password = byc.hashSync(password, salt)
  }

  const user = await User.findByIdAndUpdate(id, data)

  res.status(400).json({
    msg: 'put API - controller',
    user
  })
}

const userPost = async (req, res = response) => {
  const { name, email, password, role, img } = req.body

  const user = new User({
    name,
    email,
    password,
    role,
    img
  })

  // encriptar password
  const salt = byc.genSaltSync()
  user.password = byc.hashSync(password, salt)

  await user.save()

  res.status(201).json({
    user
  })
}

const userDelete = async (req, res = response) => {
  const { id } = req.params

  const user = await User.findByIdAndUpdate(id, { state: false })

  const userAuth = req.user

  if (user !== null) {
    await user.save()
  }

  res.status(200).json({
    user,
    userAuth
  })
}

const userPatch = (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: 'patch API - controller'
  })
}

module.exports = {
  usersGet,
  userPut,
  userPost,
  userDelete,
  userPatch
}
