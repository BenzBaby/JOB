import React, { useState, useEffect } from "react";
import "./Form.css"; // Ensure to import your CSS
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";

const Form = () => {
  const [formData, setFormData] = useState({
    text: "",
    email: "",
    password: "",
    date: "",
    number: "",
    checkbox: false,
    radio: "",
    textarea: "",
    select: "",
    file: null,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  useEffect(() => {
    // Initialize CAPTCHA with 6 characters
    loadCaptchaEnginge(6);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.text) {
      formErrors.text = "Text is required";
      isValid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!formData.email || !emailPattern.test(formData.email)) {
      formErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.password) {
      formErrors.password = "Name is required";
      isValid = false;
    }

    if (!formData.date || isNaN(new Date(formData.date).getTime())) {
      formErrors.date = "Please select a valid date";
      isValid = false;
    }
    const phonePattern = /^[0-9]{10}$/; // Matches a 10-digit number
    if (!formData.number || !phonePattern.test(formData.number)) {
      formErrors.number = 'Please enter a valid 10-digit contact number';
      isValid = false;
    }

    if (!formData.radio) {
      formErrors.radio = "Please select an option";
      isValid = false;
    }

    if (!formData.textarea) {
      formErrors.textarea = "Please enter text in the textarea";
      isValid = false;
    }

    if (!formData.select) {
      formErrors.select = "Please select an option";
      isValid = false;
    }

    if (!formData.file) {
      formErrors.file = "Please upload a file";
      isValid = false;
    }

    if (!formData.checkbox) {
      formErrors.checkbox = "You must agree to the terms and conditions";
      isValid = false;
    }

    // CAPTCHA validation
    if (!validateCaptcha(captchaInput)) {
      formErrors.captcha = "CAPTCHA verification failed";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setSuccessMessage("Form submitted successfully!");

      const formDataToSubmit = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        formDataToSubmit.append(key, value)
      );

      try {
        const response = await fetch("http://localhost:5001/api/submit-form", {
          method: "POST",
          body: formDataToSubmit,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Server error");
        }

        const data = await response.json();
        setSuccessMessage(data.message || "Form submitted successfully!");
        handleReset();
      } catch (error) {
        setErrors({ form: error.message });
      }
    }
  };

  const handleReset = () => {
    setFormData({
      text: "",
      email: "",
      password: "",
      date: "",
      number: "",
      checkbox: false,
      radio: "",
      textarea: "",
      select: "",
      file: null,
    });
    setCaptchaInput("");
    setErrors({});
    setSuccessMessage("");
    loadCaptchaEnginge(6); // Reload CAPTCHA
  };

  return (
    <div className="form-container">
      <h2>Student Admission Form</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errors.form && <div style={{ color: "red" }}>{errors.form}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            className={errors.text ? 'error' : ''}
          />
          {errors.text && <small>{errors.text}</small>}
        </div>

        <div className="form-group">
          <label>Email Address:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <small>{errors.email}</small>}
        </div>

        <div className="form-group">
          <label>FatherName:</label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <small>{errors.password}</small>}
        </div>

        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={errors.date ? 'error' : ''}
            max={new Date().toISOString().split('T')[0]} 
          />
          {errors.date && <small>{errors.date}</small>}
        </div>

        <div className="form-group">
          <label>Contact Number:</label>
          <input
            type="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            className={errors.number ? 'error' : ''}
          />
          {errors.number && <small>{errors.number}</small>}
        </div>

        <div className="form-group gender-options">
          <label>Gender:</label>
          <label>
            <input
              type="radio"
              name="radio"
              value="male"
              checked={formData.radio === 'male'}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="radio"
              value="female"
              checked={formData.radio === 'female'}
              onChange={handleChange}
            />
            Female
          </label>
          {errors.radio && <small>{errors.radio}</small>}
        </div>

        <div className="form-group">
          <label>Address:</label>
          <textarea
            name="textarea"
            value={formData.textarea}
            onChange={handleChange}
            className={errors.textarea ? 'error' : ''}
          ></textarea>
          {errors.textarea && <small>{errors.textarea}</small>}
        </div>

        <div className="form-group">
          <label>Course Selection:</label>
          <select
            name="select"
            value={formData.select}
            onChange={handleChange}
            className={errors.select ? 'error' : ''}
          >
            <option value="">Select Course...</option>
            <option value="course1">Course 1</option>
            <option value="course2">Course 2</option>
            <option value="course3">Course 3</option>
          </select>
          {errors.select && <small>{errors.select}</small>}
        </div>

        <div className="form-group">
          <label>Upload Documents:</label>
          <input
            type="file"
            name="file"
            onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
            className={errors.file ? 'error' : ''}
          />
          {errors.file && <small>{errors.file}</small>}
        </div>

        <div className="form-group">
           <label>Agree to Terms and Conditions</label>
  {errors.checkbox && <small>{errors.checkbox}</small>}
  <input
    type="checkbox"
    name="checkbox"
    checked={formData.checkbox}
    onChange={handleChange}
  />
 
</div>

  {/* CAPTCHA Section */}
  <div className="form-group">
          <label>CAPTCHA:</label>
          <LoadCanvasTemplate />
          <input
            type="text"
            placeholder="Enter CAPTCHA"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            className={errors.captcha ? "error" : ""}
          />
          {errors.captcha && <small>{errors.captcha}</small>}
        </div>

        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset} className="reset-btn">Reset</button>
      </form>
    </div>
  );
};

export default Form;
