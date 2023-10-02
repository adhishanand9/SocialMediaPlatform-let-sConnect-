const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const User = require('../schemas/UserSchema');

router.get("/", (req, res, next) => {
    res.status(200).render("forgotPassword");
})

router.post("/", async (req, res, next) => {
    var payload = req.body;

    if (req.body.email) {
        var user = await User.findOne({ email: req.body.email }).catch((error) => {
            console.log(error);
            payload.errorMessage = "Something went wrong.";
            return res.status(200).render("forgotPassword", payload);
        });

        if (user != null) {
            // Generate a unique reset token
            const token = jwt.sign({ email: user.email }, 'your-secret-key', { expiresIn: '1h' });

            // Create a transporter for sending email
            const transporter = nodemailer.createTransport({
                // Configure your email service here
                host: "smtp.elasticemail.com",
                port: 2525,
                secure: false, // upgrade later with STARTTLS
                auth: {
                    user: "adhishanand2@devops.com",
                    pass: "F4E0C87DD3B63EC497C0BA8B4846B13DD3D5",
                },
            });

            // Send the reset email
            const mailOptions = {
                from: 'adhishanand9@gmail.com',
                to: user.email,
                subject: 'Reset Your Password',
                html: `<p>Click the following link to reset your password: <a href="http://localhost:3000/reset-password/${token}">Reset Password</a></p>`,
            };

            await transporter.sendMail(mailOptions);
            return res.status(200).render("login", payload);
           // return res.status(200).json({ message: 'Password reset email sent.' });
        }
    }

    payload.errorMessage = "Email not found.";
    res.status(200).render("forgotPassword", payload);
})

module.exports = router;
