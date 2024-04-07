// This is to display the foods according to their shops.

const express = require('express');
const router = express.Router();
const Admin = require('../../models/Admin'); 
const FoodItem = require('../../models/Add_item'); 
const FoodItemCat =  require('../../models/Add_itemCat');

const mongoose = require('mongoose');

router.get('/owner/:owner_id', async (req, res) => {
    try {
        const { owner_id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(owner_id)) {
            return res.status(400).json({ error: 'Invalid owner ID' });
        }

        const owner = await Admin.findOne({ _id: owner_id });

        if (!owner) {
            return res.status(404).json({ error: 'Owner not found' });
        }

        const foodItems = await FoodItem.find({ shopname: owner.shopname }); 
        const foodItemCat = await FoodItemCat.find({ shopname: owner.shopname });  

        res.send([foodItems, foodItemCat]);
        
    } catch (error) {
        console.error('Error fetching owner and food items:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
