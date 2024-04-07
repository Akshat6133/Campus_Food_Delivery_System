// This is for creating a new Shop by the superadmin

const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');  

const Canteen = require('../../models/Canteen');

router.post("/ShopData", [
    body('owner_email', 'Email Format is not correct').isEmail(),
    body('owner_contact', 'Length of phone number must be of 10 digits').matches(/^\d+$/).isLength({ max:10 , min:10 }),
]

, async (req, res) => {

    try {

        const existing_shops = await Canteen.findOne({ shopname: req.body.shopname });

        if (existing_shops) {
            console.log("Shop with the same name aldready present");
            return res.status(400).json({ success: false, error: "Shop with the same name Aldready Present" });
        }

        const newShop = new Canteen({
            shopname: req.body.shopname,
            name: req.body.owner_name,
            email: req.body.owner_email,
            contact: req.body.owner_contact,
            image: req.body.image,
            description: req.body.description
        });

        await newShop.save(); 

        console.log("New Shop created successfully");
        return res.json({ success: true }); 

    } catch (error) {
        console.error("Error creating New Shop:", error); 
        return res.status(500).json({ success: false, error: "Internal Server Error" }); // Send failure response
    }
});

module.exports = router;    