// This page is for signup and login of Admin.

const express = require('express');
const router = express.Router()                                                            
const Admin = require('../../models/Admin');

const { body, validationResult } = require('express-validator');

const jwt = require("jsonwebtoken");                                                                // Importing jsonwebtoken for token generation
const bcrypt = require("bcryptjs");                                                                 // Importing bcryptjs for password hashing

const jwtSecret = "HiNanna";                                                                        // Secret key for JWT token generation

router.post("/CreateAdmin", [
    body('email', 'Email Format is not correct').isEmail(),
    body('name').isLength({ min: 4 }),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
    body('contact',' Contact number length should be of 10').isLength({ max: 10, min: 10})

], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const existingShop = await Admin.findOne({ shopname: req.body.shopname });
        
        if (existingShop) {
            console.log("Shopname is already Registered");
            return res.status(400).json({ success: false, error: "Email Already Registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await Admin.create({
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email,
            contact: req.body.contact,
            shopname: req.body.shopname,
        });

        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

router.post("/loginAdmin", async (req, res) => {

    let email = req.body.email;                                                                     // Get email from request body

    try {
        let adminData = await Admin.findOne({ email });                                               // Find Admin data by email

        if (!adminData) {
            return res.status(400).json({ errors: "Incorrect email or password" });                 // Return error if Admin not found
        }

        const passwordCompare = await bcrypt.compare(req.body.password, adminData.password);          // Compare passwords

        if (!passwordCompare) {
            return res.status(400).json({ errors: "Incorrect email or password" });                 // Return error if passwords don't match
        }

        const data = { admin: {id: adminData.id} };

        const shopname = adminData.shopname;

        const authToken = jwt.sign(data, jwtSecret);                                                // Generate JWT token
        return res.json({ success: true, authToken: authToken, shopname: shopname });                                   // Send success response with token

    } catch (error) {
        console.log(error);
        res.json({ success: false });                                                               // Send failure response
    }
});

module.exports = router;    