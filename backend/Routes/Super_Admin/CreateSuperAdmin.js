// This file is for loggin page of SuperAdmin

const express = require('express');
const router = express.Router()
const SuperAdmin = require('../../models/SuperAdmin');

const { body, validationResult } = require('express-validator');                                    // Importing express-validator for input validation

const jwt = require("jsonwebtoken");                                                                // Importing jsonwebtoken for token generation
const bcrypt = require("bcryptjs");                                                                 // Importing bcryptjs for password hashing

const jwtSecret = "BhargavRocks";                                                                   // Secret key for JWT token generation

router.post("/loginSuperAdmin", async (req, res) => {

    let email = req.body.email;                                                                     // Get email from request body

    try {
        let SuperAdminData = await SuperAdmin.findOne({ email });                                             

        if (!SuperAdminData) {
            return res.status(400).json({ errors: "Incorrect Email or password" });                
        }

        const passwordCompare = await bcrypt.compare(req.body.password, SuperAdminData.password);      

        if (!passwordCompare) {
            return res.status(400).json({ errors: "Incorrect email or password" });            
        }

        const data = { SuperAdmin: {id: SuperAdminData.id} };

        const authToken = jwt.sign(data, jwtSecret);                                                // Generate JWT token
        return res.json({ success: true, authToken: authToken });                                   // Send success response with token

    } catch (error) {
        console.log(error);
        res.json({ success: false });                                                     
    }
});

module.exports = router;    