const express = require('express');
const router = express.Router();

// Item Model
const Modal = require('../../models/Item');

// Recipe Model
// const recipe = require('../../models/');



// @rout    GET  api/item
// @desc    Get All Data
// @access  Public
router.get('/', (req, res) => {
    Modal.Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items)).catch(err => console.log(err));
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
    Modal.Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

// @rout    UPDADTE  api/item/:id
// @desc    Update item
// @access  Public
router.put('/:id', (req, res) => {

    Modal.Item.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(item => res.json({success: true, item: item}))
        .catch(err => res.status(404).json({success: false,Error:err}));
});

module.exports = router;