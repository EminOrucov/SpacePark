const express = require('express')
const Park = require('../models/park')
const auth = require('../middleware/auth')
const { route } = require('./parkRouter')

const router = express.Router()

router.post('/park', auth, async (req, res) => {
    const park = new Park({
        ...req.body,
        owner: req.user._id
    })
    try {
        console.log('asdf');
        
        await park.save()
        res.status(201).send("park created")
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/park', auth, async (req, res) => {
    try {
        await req.user.populate({
            path: 'park',
        })
        res.status(200).send(req.user.parks)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/parks', async (req, res) => {
    try{
        const parks = await Park.find({available: true});
        res.status(200).send(parks)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.get('/park/:id', auth, async (req, res) => {
    try {
        const park = await Park.findOne({_id: req.params.id, owner: req.user._id})   
        if(!park){
            return res.status(404).send('Park not found')
        }
        res.status(200).send(park)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/park/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['available', 'owner', 'price', 'till']
    const isAllowed = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isAllowed){
        return res.status(400).send('Invalid update')
    }

    try {
        const park = await Park.findOne({_id: req.params.id, owner: req.user._id})
        
        if(!park){
            return res.status(404).send('park not found')
        }

        updates.forEach(update => park[update] = req.body[update])
        await park.save()

        res.status(200).send(park)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router