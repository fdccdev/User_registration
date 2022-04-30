const mongoose = require('mongoose')

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Database mode: on')
  } catch (error) {
    console.error(error)
    throw new Error('Error al iniciar la base de datos!')
  }
}

module.exports = {
  dbConnection
}
