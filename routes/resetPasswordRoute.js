const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('../schemas/UserSchema');

router.use(bodyParser.urlencoded({ extended: false }));

// Reset Password Form (GET)
router.get('/:token', async (req, res, next) => {
    try {
        const { token } = req.params;

        // Render the reset password form with the token
        res.render('resetPassword', { token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Reset Password Form Submission (POST)
router.post('/:token', async (req, res, next) => {
    try {
        const { token } = req.params;
        const { newPassword, confirmPassword } = req.body;

        // Validate password fields
        if (!newPassword || !confirmPassword || newPassword !== confirmPassword) {
            return res.status(400).render('resetPassword', {
                token,
                errorMessage: 'Passwords do not match.'
            });
        }

        // Find the user by the reset token
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).render('resetPassword', {
                token,
                errorMessage: 'Invalid or expired token. Please request a new password reset.'
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password and clear the reset token fields
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        // Redirect to login page with a success message
        res.redirect('/login?reset=success');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;