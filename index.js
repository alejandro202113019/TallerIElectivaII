<<<<<<< HEAD
require('dotenv').config();
=======
>>>>>>> 0abc643c81d293d96698fef95d49fa4675ce449f
const express = require('express');
const path = require('path');
const app = express();
const connectDB = require('./drivers/db');
const cors = require('cors');

<<<<<<< HEAD

const swaggerDocs = require('./swagger');

app.set('PORT', process.env.PORT || 5000);
=======
// Swagger
const swaggerDocs = require('./swagger');

app.set('PORT', process.env.PORT || 4000);
>>>>>>> 0abc643c81d293d96698fef95d49fa4675ce449f
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Swagger documentation
swaggerDocs(app);

// Rutas
app.use('/', require('./routes/index'));

async function startServer() {
  try {
    await connectDB();
    app.listen(app.get('PORT'), () =>
      console.log(`Server ready at Port ${app.get('PORT')}`)
    );
  } catch (err) {
    console.error('Error starting server:', err);
  }
}

startServer();
