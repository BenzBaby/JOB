const mongoose = require('mongoose');

const formSubmissionSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email validation pattern
  },
  password: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  number: { 
    type: Number, 
    required: true, 
    min: 1, // Minimum value for number
    max: 100, // Maximum value for number
  },
  checkbox: { 
    type: Boolean, 
    required: true 
  },
  radio: { 
    type: String, 
    required: true 
  },
  textarea: { 
    type: String 
  },
  select: { 
    type: String, 
    required: true 
  },
  file: { 
    type: String, // File path for uploaded file
    default: null // Ensure it's null by default if no file is uploaded
  },
}, { timestamps: true });  // Optionally add timestamps for createdAt/updatedAt fields

const FormSubmission = mongoose.model('FormSubmission', formSubmissionSchema);

module.exports = FormSubmission;
