const User = require('../models/User');
const bcrypt = require('bcryptjs');

const resetPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user._id; // Assuming you're using a middleware to extract the user ID from the token

  try {
    const user = await User.findById(userId); // Find user by ID
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Compare current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect current password' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during password reset.' });
  }
};

module.exports = { resetPassword };
