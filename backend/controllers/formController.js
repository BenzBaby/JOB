const { validationResult } = require('express-validator');
const FormSubmission = require('../models/FormSubmission'); // Import the FormSubmission model

// Form submission logic
const submitForm = async (req, res) => {
  // Get validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure form data from the request body
  const { text, email, password, date, number, checkbox, radio, textarea, select } = req.body;
  const file = req.file ? req.file.path : null; // Handle file upload and get file path

  // Create a new form submission object
  const newFormSubmission = new FormSubmission({
    text,
    email,
    password,
    date,
    number,
    checkbox,
    radio,
    textarea,
    select,
    file,
  });

  try {
    // Save the form submission data to the database
    await newFormSubmission.save();

    // Success response after form submission
    res.json({ message: 'Form submitted successfully!' });
  } catch (err) {
    console.error('Error submitting form:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = { submitForm };
