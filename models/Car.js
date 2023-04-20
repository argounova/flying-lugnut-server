const mongoose = require ('mongoose');

const CarSchema = new mongoose.Schema({
    make: {
        type: String,
    },
    model: {
        type: String,
    },
    trim: {
        type: String,
    },
    exteriorColor: {
        type: String,
    },
    seriesName: {
        type: String,
    },
    inStock: {
        type: Boolean,
    },
    newInventory: {
        type: Boolean,
    },
    clearance: {
        type: Boolean,
    },
    featured: {
        type: Boolean,
    },
    mainImage: {
        type: String,
    },
    detailImage1: {
        type: String,
    },
    detailImage2: {
        type: String,
    },
    detailImage3: {
        type: String,
    },
    etsyLink: {
        type: String,
    },
    detailDescription: {
        type: String,
    },
    price: {
        type: Number,
    },
    thisCarInSeries: {
        type: Number,
    },
    totalCarsInSeries: {
        type: Number,
    },
    stripeId: {
        type: String,
    },
});

module.exports = mongoose.model('Car', CarSchema);