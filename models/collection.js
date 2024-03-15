const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    year_of_creation: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    digital_representations: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('collection', collectionSchema);