const express = require('express');
const router = express.Router();

// Item Model
const Modal = require('../../models/Item');


// @rout    GET  api/recipes
// @desc    Get All Data
// @access  Public
router.get('/:item_id', (req, res) => {
    Modal.Recipe.find({ item_id: req.params.item_id })
        .sort({ date: -1 })
        .then(recipes => res.json(recipes)).catch(err => console.log(err));
});

// @rout    POST  api/recipes
// @desc    Create An Recipe
// @access  Public
router.post('/', (req, res) => {
    const newItem = new Recipe({
        item_id: req.body.item_id,
        name: req.body.name
    });

    newItem.save()
        .then(recipe => res.json(recipe));
});

// @rout    DELETE  api/recipes/:id
// @desc    Delete An Recipe
// @access  Public
router.delete('/:id', (req, res) => {
    Modal.Recipe.findById(req.params.id)
        .then(recipe => recipe.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});


module.exports = router;