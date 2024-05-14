const express = require('express');
const AuthorModel = require('../models/author');

const router = express.Router();

// Middleware function to get a single author by ID
async function getAuthor(req, res, next) {
    try {
        const author = await AuthorModel.findById(req.params.id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.author = author;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// GET all authors
router.get('/', async (req, res) => {
    try {
        const authors = await AuthorModel.find();
        res.json(authors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single author
router.get('/:id', getAuthor, (req, res) => {
    res.json(res.author);
});

// CREATE an author
router.post('/', async (req, res) => {
    const {
        firmName, no, amountOfAssistance, balance,
        totalRefundedAmount, totalAmountPayable, delayedMonths,
        due, payable, arrears
    } = req.body;

    if (!firmName || no == null || amountOfAssistance == null || balance == null ||
        totalRefundedAmount == null || totalAmountPayable == null || delayedMonths == null ||
        due == null || payable == null || arrears == null) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingAuthor = await AuthorModel.findOne({ firmName, no });
        if (existingAuthor) {
            return res.status(400).json({ message: 'Author already exists' });
        }

        const author = new AuthorModel(req.body);
        const newAuthor = await author.save();
        res.status(201).json({ message: 'Author created successfully', author: newAuthor });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE an author (PATCH)
router.patch('/:id', getAuthor, async (req, res) => {
    const updates = Object.keys(req.body);
    updates.forEach(update => res.author[update] = req.body[update]);

    try {
        const updatedAuthor = await res.author.save();
        res.json(updatedAuthor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE an author (PUT)
router.put('/:id', getAuthor, async (req, res) => {
    try {
        const updatedAuthor = await AuthorModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedAuthor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE an author
router.delete('/:id', getAuthor, async (req, res) => {
    try {
        await AuthorModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Author deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
