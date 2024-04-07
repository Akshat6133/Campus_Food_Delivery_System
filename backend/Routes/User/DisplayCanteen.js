// This page is for Displaying shops in webpage.

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Canteen = require('../../models/Canteen');

router.get('/shopData', async (req, res) => {
    try {

        const shops = mongoose.connection.db.collection("Canteen");                             
        const shopdata = await shops.find({}).toArray();

        res.send([shopdata]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;