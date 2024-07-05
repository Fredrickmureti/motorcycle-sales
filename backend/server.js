require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const motorcycleRoutes = require('./routes/motorcycle');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

const app = express();
//const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/motorcycles', motorcycleRoutes);
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);

app.get('/https://deploy-mern-api-nine.vercel.app', (req, res) => {
  res.send('Hello World!');
})

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    /* console.log('Connected to MongoDB');
     app.listen(PORT, () => {
       console.log(`Server listening on port ${PORT}`);
     });*/
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
