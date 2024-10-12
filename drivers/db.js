const mongoose = require('mongoose')

require('dotenv').config();


const URI= process.env.DATABASE_URL;
console.log('Ruta BD',URI)
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

