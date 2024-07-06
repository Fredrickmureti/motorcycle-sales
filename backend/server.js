require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const motorcycleRoutes = require('./routes/motorcycle');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

const app = express();
corsOptions = {
  origin: 'https://deploy-mern-frontend-fs4nvhnkf-fredrick-lugards-projects.vercel.app/login',
  optionsSuccessStatus: 200,

}
app.use(cors());
app.use(bodyParser.json());

app.use('/motorcycles', motorcycleRoutes);
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Motorcycle Sales API!');
});

const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
  console.error('MONGO_URL environment variable is not set');
  process.exit(1);
}

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with an error code
  });

module.exports = app;