const express = require('express');
const path = require('path');
const app = express();
const connectDB = require('./drivers/db');
const cors = require('cors');

app.set('PORT', process.env.PORT || 4000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cors());

// Use express.json() to parse JSON request bodies
app.use(express.json());

// Use express.urlencoded() to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// Your routes
app.use('/', require('./routes/index'));

// Connect to the database and start the server
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
