const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductScheme = new Schema({
    id: {
        type: Schema.Types.ObjectId
    },
    name: {
        type: String,
        maxLength: 30,
        required: true
    },
    description: {
        type: String,
        maxLength: 100
    },
    price: {
        type: Number,
        min: 1,
        required: true,
    },
    stock: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Products", ProductScheme)