const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const recipeTagsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});


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
    },
    recipes: [recipeTagsSchema]
});


Item = mongoose.model('item', ItemSchema);
module.exports = {
    Item: Item,
};