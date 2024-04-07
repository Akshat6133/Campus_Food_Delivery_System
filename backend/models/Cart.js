const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
    items: [{
        type: String
        // You may need to adjust the type based on your actual item structure
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = mongoose.model('cart', CartSchema);
