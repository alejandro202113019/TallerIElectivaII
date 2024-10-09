const mongoose = require('mongoose')

//const URI = "mongodb://127.0.0.1:27017/foot"

const URI= 'mongodb+srv://alejandromesa:5bjnH2wI2aB5hGo8@cluster0.8hqvu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.set('strictQuery', false)

async function connectDB() {
    try {
      await mongoose.connect(URI);
      console.log('Connect DB Success');
    } catch (err) {
      console.log('Connect DB Fail ' + err);
    }
  }
  

  

module.exports = connectDB

