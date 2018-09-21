const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const recipeTagsSchema = new Schema({
    item_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

Item = mongoose.model('item', ItemSchema);
Recipe = mongoose.model('recipe', recipeTagsSchema);
module.exports = {
    Item: Item,
    Recipe: Recipe
};