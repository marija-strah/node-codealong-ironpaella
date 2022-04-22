const mongoose = require('mongoose');  //==> goes to seeds.js
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        min: 1
    },
    hasStock: {
        type: Boolean,
        default: true
    },
    tags: {
        type: [String],
        enum: ["vegetables", "food", "fibre", "meat"]
    },
    categories: [String],
    imgFile: {
        type: String,
        default: "generic-food.jpg"
    },
    store: {
        type: [String],
        enum: ["online", "germany", "colombia"]
    }
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;