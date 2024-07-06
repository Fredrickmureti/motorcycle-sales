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

const corsOptions = {
  origin: 'https://deploy-mern-frontend-psi.vercel.app',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/motorcycles', motorcycleRoutes);
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Motorcycle Sales API!');
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


module.exports = app;
