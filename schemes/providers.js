const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProviderScheme = new Schema({
    id: {
        type: Schema.Types.ObjectId
    },
    name: {
        type: String,
        maxLength: 30,
        required: true
    },
    direction: {
        type: String,
        maxLength: 100,
        required: true
    },
    email: {
        type: String,
        min: 1
    },
    tel: {
        type: Number,
        maxLength: 10,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Providers", ProviderScheme)