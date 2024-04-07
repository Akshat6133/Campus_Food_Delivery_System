// This is required for owner to be logged in

const express = require('express');
const router = express.Router();

router.get('/owners', async (req, res) => {
    try {
        res.send([global.owners]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
