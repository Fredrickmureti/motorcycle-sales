const express = require('express');
const multer = require('multer');
const { uploadImage } = require('../utils/cloudinary');
const Motorcycle = require('../models/Motorcycle');
const { auth, admin } = require('../middleware/auth');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Get all motorcycles
router.get('/', async (req, res) => {
  try {
    const motorcycles = await Motorcycle.find();
    res.status(200).json({ motorcycles });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get a specific motorcycle by ID
router.get('/:id', async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findById(req.params.id);
    if (!motorcycle) {
      return res.status(404).json({ success: false, message: 'Motorcycle not found' });
    }
    res.status(200).json({ success: true, motorcycle });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Add Motorcycle Route - Admin Only
router.post('/add', auth, admin, upload.array('images', 10), async (req, res) => {
  const { brand, model, year, description, condition, price, category, location, availability, sellerContact, conditionScore } = req.body;
  const files = req.files;
  try {
    const images = [];
    for (const file of files) {
      const imageUrl = await uploadImage(file);
      images.push(imageUrl);
    }
    const newMotorcycle = new Motorcycle({
      brand,
      model,
      year,
      description,
      images,
      condition,
      price,
      category,
      location,
      availability,
      sellerContact,
      conditionScore
    });
    await newMotorcycle.save();
    res.status(201).json({ success: true, motorcycle: newMotorcycle });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update Motorcycle Route - Admin Only
router.put('/edit/:id', auth, admin, upload.array('images', 10), async (req, res) => {
  const { brand, model, year, description, condition, price, location, availability, conditionScore } = req.body;
  const files = req.files;
  try {
    const images = [];
    for (const file of files) {
      const imageUrl = await uploadImage(file);
      images.push(imageUrl);
    }
    const updatedMotorcycle = await Motorcycle.findByIdAndUpdate(
      req.params.id,
      { brand, model, year, description, images, condition, price, location, availability, conditionScore },
      { new: true } // return the updated document
    );
    if (!updatedMotorcycle) {
      return res.status(404).json({ success: false, message: 'Motorcycle not found' });
    }
    res.status(200).json({ success: true, motorcycle: updatedMotorcycle });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete Motorcycle Route - Admin Only
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const deletedMotorcycle = await Motorcycle.findByIdAndDelete(req.params.id);
    if (!deletedMotorcycle) {
      return res.status(404).json({ success: false, message: 'Motorcycle not found' });
    }
    res.status(200).json({ success: true, message: 'Motorcycle deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;