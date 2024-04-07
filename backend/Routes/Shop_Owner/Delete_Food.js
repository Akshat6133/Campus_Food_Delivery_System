const express = require('express');
const router = express.Router();
const Admin = require('../../models/Admin'); 
const FoodItem = require('../../models/Add_item'); 
const FoodItemCat =  require('../../models/Add_itemCat');

const mongoose = require('mongoose');

router.delete(`/cards/:cardId`, async (req, res) => {
    try {
        let del_id = req.params.cardId;

        const deletedItem = await FoodItem.findOneAndDelete({ _id: del_id });
        
        if (!deletedItem) {
            return res.status(404).send("Food item not found");
        }
        
        res.send("Deleted");
    } catch (error) {
        console.error('Error deleting foodItem:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
