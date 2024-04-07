// This is for Adding Items by ShopOwner into his shop

const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');

const Items = require('../../models/Add_item');
const ItemsCat = require('../../models/Add_itemCat');

router.post("/CreateFood", [
    body('name').isLength({ min: 3 }),
    body('image').isLength({ min: 5 }),
    body('options').isArray({ min: 1 })]

    , async (req, res) => {

        console.log("Item Adding Request:", req.body);

        try {

            const existingItems = await Items.find({ name: req.body.name });
            const existingItemsCat = await ItemsCat.find({ categoryname: req.body.categoryname });

            if (existingItems.length > 0 && existingItemsCat.length > 0) {
                for (const item of existingItems) {
                    if (item.categoryname === req.body.categoryname && item.shopname === req.body.shopname) {
                        console.log("Food Item already present");
                        return res.status(400).json({ success: false, error: "Food Item already Present" });
                    }
                }
            }

            const newItem = new Items({
                shopname: req.body.shopname,
                categoryname: req.body.categoryname,
                name: req.body.name,
                image: req.body.image,
                options: req.body.options
            });

            await newItem.save();

            if (existingItemsCat.length === 0) {
                const newItemsCat = new ItemsCat({
                    shopname: req.body.shopname,
                    categoryname: req.body.categoryname,
                });

                await newItemsCat.save();
            } else {
                let categoryExistsForShop = false;
                for (const itemCat of existingItemsCat) {
                    if (itemCat.shopname === req.body.shopname) {
                        categoryExistsForShop = true;
                        break;
                    }
                }
                if (!categoryExistsForShop) {
                    const newItemsCat = new ItemsCat({
                        shopname: req.body.shopname,
                        categoryname: req.body.categoryname,
                    });
                    await newItemsCat.save();
                }
            }


            console.log("Item created successfully");
            return res.json({ success: true });

        } catch (error) {
            console.error("Error creating Item:", error);
            return res.status(500).json({ success: false, error: "Internal Server Error" }); // Send failure response
        }
    });

module.exports = router;    