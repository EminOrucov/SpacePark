const mongoose = require('mongoose')

const parkSchema = mongoose.Schema({
    lat: {
        type: Number,
        required: true,
    },
    lon: {
        type: Number,
        required: true,
    },
    available: {
        type: Boolean,
        default: false,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    till: {
        type: Date
    }
},{
    timestamps: true
})

const Park = mongoose.model('Park', parkSchema)

module.exports = Park