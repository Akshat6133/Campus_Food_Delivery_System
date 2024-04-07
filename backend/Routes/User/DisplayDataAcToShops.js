// Getting user side shops, when he click on 1 shop, from backend it should get that shop only.

const express = require('express');
const router = express.Router();
const Canteen = require('../../models/Canteen');
const FoodItem = require('../../models/Add_item'); 
const FoodItemCat =  require('../../models/Add_itemCat');

const mongoose = require('mongoose');

router.get('/shop/:shop_id', async (req, res) => {
    try {

        const { shop_id } = req.params;

        const shop = await Canteen.findOne({ _id: shop_id });

        if (!shop) {
            return res.status(404).json({ error: 'Owner not found' });
        }

        //console.log(shop.shopname);

        const foodItems = await FoodItem.find({ shopname: shop.shopname }); 
        const foodItemCat = await FoodItemCat.find({ shopname: shop.shopname });  

        //console.log(foodItems);

        res.send([foodItems, foodItemCat]);
        
    } catch (error) {
        console.error('Error fetching owner and food items:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
