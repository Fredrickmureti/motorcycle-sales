require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const motorcycleRoutes = require('./routes/motorcycle');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/motorcycles', motorcycleRoutes);
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Motorcycle Sales API!');
});

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    // No need to specify a port, Vercel handles it
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

module.exports = app; // Ensure this line is included for Vercel
