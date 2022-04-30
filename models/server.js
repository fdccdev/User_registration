const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT
    this.usersPath = '/api/users'
    this.authPath = '/api/auth'

    // Conectar database
    this.conectarDB()

    // middlewares
    this.middlewares()

    // rutas de la app
    this.routes()
  }

  routes () {
    this.app.use(this.authPath, require('../routes/auth'))
    this.app.use(this.usersPath, require('../routes/user'))
  }

  async conectarDB () {
    await dbConnection()
  }

  middlewares () {
    // cors
    this.app.use(cors())

    // lectura body
    this.app.use(express.json())

    // directorio publico
    this.app.use(express.static('public'))
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log('Server running on port:', this.port)
    })
  }
}

module.exports = Server
