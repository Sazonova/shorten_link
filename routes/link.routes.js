const { Router } = require('express');
const config = require('config');
const shortid = require('shortid');
const Link = require('../models/Link');
const auth = require('../middleware/auth.middleware');
const router = Router();

// /api/link/generate
// to create a new link
router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl');
        const {from} = req.body;

        const code = shortid.generate();

        const existing = await Link.findOne({ from });
        if (existing) {
            return res.json({ link: existing });
        }
        const to = baseUrl + '/t/' + code;

        const link = new Link({
            code, to, from, owner: req.user.userId
        });
        
        await link.save();

        res.status(201).json({link});
    } catch (error) {
        res.status(500).json({ message: 'Error, try again' });
    }
});

// /api/link
// to get all links
router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId }); 
        res.json(links);
    } catch (error) {
        res.status(500).json({ message: 'Error, try again' });
    }
});

// /api/link/:id
// to get link by id
router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        res.json(link);
    } catch (error) {
        res.status(500).json({ message: 'Error, try again' });
    }
})

// /api/link/:id
// to delete link
router.delete('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);

        if (!link) {
            return res.status(404).json({ message: 'Link not found' });
        }

        //Check user
        
        if (link.owner.toString() !== req.user.userId){
            return res.status(401).json({ msg: 'User not authorized' });
        }
        await link.remove();
        res.json({ message: 'Link removed' });
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Link not found' });
        }
        res.status(500).json('Server error');
    }
})

module.exports = router;