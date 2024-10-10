const mongoose = require('mongoose')
<<<<<<< HEAD
require('dotenv').config();
//const URI = "mongodb://127.0.0.1:27017/foot"

const URI= process.env.DATABASE_URL;

=======

//const URI = "mongodb://127.0.0.1:27017/foot"

const URI= 'mongodb+srv://alejandromesa:5bjnH2wI2aB5hGo8@cluster0.8hqvu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
>>>>>>> 0abc643c81d293d96698fef95d49fa4675ce449f
mongoose.set('strictQuery', false)

async function connectDB() {
    try {
      await mongoose.connect(URI);
      console.log('Connect DB Success');
    } catch (err) {
      console.log('Connect DB Fail ' + err);
    }
  }
<<<<<<< HEAD
=======
  

  

>>>>>>> 0abc643c81d293d96698fef95d49fa4675ce449f
module.exports = connectDB

