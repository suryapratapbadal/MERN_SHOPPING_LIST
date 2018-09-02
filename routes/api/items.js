const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// Recipe Model
// const recipe = require('../../models/');



// @rout    GET  api/item
// @desc    Get All Data
// @access  Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items));
});

// @rout    POST  api/item
// @desc    Create An Item
// @access  Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save()
        .then(item => res.json(item));
});
 
// @rout    DELETE  api/item/:id
// @desc    Delete A Item
// @access  Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

// @rout    GET  api/item/recipe
// @desc    Get All item recipe
// @access  Public
// router.get('/recipe', (req, res) => {
//     recipe.find()
//         .sort({ date: -1 })
//         .then(items => res.json(items));
// });

module.exports = router;