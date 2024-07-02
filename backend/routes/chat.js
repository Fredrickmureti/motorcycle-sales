const express = require('express');
const { auth, admin } = require('../middleware/auth');
const Message = require('../models/Message');
const User = require('../models/User');
const nodemailer = require('nodemailer');

const router = express.Router();

let agentsAvailable = true;

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Replace with your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Get agent availability
router.get('/availability', (req, res) => {
  res.status(200).json({ available: agentsAvailable });
});

// Set agent availability - Admin Only
router.post('/availability', [auth, admin], (req, res) => {
  agentsAvailable = req.body.available;
  res.status(200).json({ available: agentsAvailable });
});

// Save message
router.post('/message', async (req, res) => {
  const { name, email, message, userId } = req.body;
  try {
    const newMessage = new Message({ name, email, message, userId });
    await newMessage.save();
    res.status(201).json({ success: true, message: 'Message saved successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get all messages - Admin Only
router.get('/messages', [auth, admin], async (req, res) => {
  try {
    const messages = await Message.find().populate('userId');
    res.status(200).json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get unread messages - Admin Only
router.get('/messages/unread', [auth, admin], async (req, res) => {
  try {
    const unreadMessages = await Message.find({ status: 'new' }).populate('userId');
    res.status(200).json({ success: true, unreadMessages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Reply to a message - Admin Only
router.post('/reply', [auth, admin], async (req, res) => {
  const { messageId, reply } = req.body;
  try {
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    message.reply = reply;
    message.status = 'replied';
    await message.save();

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: message.email,
      subject: 'Reply to your message',
      text: `Hi ${message.name},\n\n${reply}\n\nBest regards,\nCustomer Support`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ success: false, error: error.message });
      }
      res.status(200).json({ success: true, message: 'Reply sent successfully' });
    });

    // Emit reply to the user via socket
    req.io.to(message.userId.toString()).emit('chat reply', { reply, messageId });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get online status of users - Admin Only
router.get('/online-status', [auth, admin], async (req, res) => {
  try {
    const users = await User.find({ online: true });
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;