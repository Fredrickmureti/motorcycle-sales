require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const EMAIL = 'doe@gmail.com';
const PASSWORD = '5664';
const ROLE = 'admin';

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('Connected to MongoDB');

    // Check if the admin user already exists
    const existingAdmin = await User.findOne({ email: EMAIL });
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.email);
      mongoose.disconnect();
      return;
    }

    // Create the admin user
    const hashedPassword = await bcrypt.hash(PASSWORD, 12);
    const newAdmin = new User({
      name: "Admin",
      email: EMAIL,
      password: hashedPassword,
      role: ROLE,
    });

    await newAdmin.save();
    console.log('Admin user created successfully:', newAdmin.email);
    mongoose.disconnect();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    mongoose.disconnect();
  });