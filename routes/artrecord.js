const router = require('express').Router();
let artlistModel = require('../models/artlist');


// get('/')
router.route('/api/arts').get((req, res) => {
    artlistModel.find()
    .then((arts) => res.json(arts))
    .catch((err) => res.status(400).json('Error: ' + err));
})

// get('/:id')
router.route('/api/art/:id').get((req, res) => {
    artlistModel.find({"_id" : req.params.id})
    .then((art) => res.json(art))
    .catch((err) => res.status(400).json('Error: ' + err));
})

// post('/')
router.route('/api/art').post(async (req,res) => {
    const artName = req.body.artName;
    const serial = req.body.serial;
    const src = req.body.src;
    const alt = req.body.alt;
    const user = req.body.user;
    const bid = req.body.bid;

    const bids = {user: user,
                  bid: bid}
    console.log(bids)
    const newArt = new artlistModel({
        artName: artName,
        serial: serial,
        src: src,
        alt: alt,
        bids: bids
    })

    console.log(newArt)
    await newArt
        .save()
        .then(() => res.json('New art added!'))
        .catch((err) => res.status(400).json('Error: ' + err));

})

//put ('/id')
router.route('/api/art/:id').put(async (req,res) => {
    const artName = req.body.artName;
    const serial = req.body.serial;
    const src = req.body.src;
    const alt = req.body.alt;
    const user = req.body.user;
    const bid = req.body.bid;

    const bids = {user: user,
                  bid: bid}
    
    await artlistModel.update(
        {_id: req.params.id},
        { $set: {
            "artName" : artName,
            "serial": serial,
            "src": src,
            "alt": alt,
            "bids": bids
        }}
    )
    .then(() => res.json('Updated!'))
    .catch((err) => res.status(400).json('Error: ' + err));
})

//delete('/:id')
router.route('api/art/:id').delete(async (req, res) => {
    await artlistModel.findByIdAndDelete(req.params.id)
        .then(() => res.json('Art record deleted.'))
        .catch((err) => res.status(400).json('Error: ' + err));
})

module.exports = router;