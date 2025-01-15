const express = require('express');
const { check, validationResult } = require('express-validator');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const FormSubmission = require('../models/FormSubmission'); // Import FormSubmission model

const upload = multer({ 
  dest: 'uploads/', 
  limits: { fileSize: 5 * 1024 * 1024 }, // Set a limit for file size (5MB in this case)
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Allowed file types
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only JPG, PNG, and PDF are allowed.'));
    }
    cb(null, true);
  }
}); // Configure file uploads

const router = express.Router();

// Form Submission Route
router.post(
  '/submit-form',
  upload.single('file'), // Handling file uploads
  [
    check('email').isEmail().withMessage('Invalid email format'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    check('date').isDate().withMessage('Invalid date format'),
    check('number').isNumeric().withMessage('Number must be valid'),
    check('checkbox').isBoolean().withMessage('Checkbox must be a boolean value'),
    check('radio').isIn(['option1', 'option2']).withMessage('Invalid radio option'),
    check('select').notEmpty().withMessage('Select dropdown must not be empty'),
    check('text').notEmpty().withMessage('Text input cannot be empty'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { text, email, password, date, number, checkbox, radio, textarea, select } = req.body;
      const filePath = req.file ? req.file.path : null;

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save the form data
      const formSubmission = new FormSubmission({
        text,
        email,
        password: hashedPassword, // Store hashed password
        date,
        number,
        checkbox,
        radio,
        textarea,
        select,
        file: filePath,
      });

      await formSubmission.save();

      res.json({ message: 'Form submitted successfully!' });
    } catch (error) {
      console.error('Error saving form data:', error);
      // Handle specific file errors
      if (error.message.includes('Invalid file type')) {
        return res.status(400).json({ error: 'Invalid file type. Only JPG, PNG, and PDF are allowed.' });
      }

      res.status(500).json({ error: 'Server Error' });
    }
  }
);

module.exports = router;
