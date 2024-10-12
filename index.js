//index.js
require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const connectDB = require('./drivers/db');
const cors = require('cors');

// Swagger
const swaggerDocs = require('./swagger');

app.set('PORT', process.env.PORT || 4000);
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
