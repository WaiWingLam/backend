const mongoose = require('mongoose');

const artlistSchema = new mongoose.Schema({
    artName: {type: String},
    serial: {type: String},
    src: { type: String, required: true},
    alt: {type: String},
    bids: [{user: { type: String, required: true},
            bid: { type: Number, required: true}}]
})

const artlistModel = mongoose.model('artrecords', artlistSchema);
module.exports = artlistModel;