// get route from express

const express = require('express');
const router = express.Router();
const { connectToMongoDB } = require('../../lib/mongodb/db');

// Define middleware to connect to MongoDB and retrieve the collection
router.use(async (req, res, next) => {
    const { db } = await connectToMongoDB();
    const collection = db.collection('Survey');
    req.collection = collection;
    next();
});

// Get surveys
router.get('/', async (req, res) => {
    const surveys = await req.collection.find({}).toArray();
    res.json(surveys);
});

// Get survey by id
router.get('/:id', async (req, res) => {
    const survey = await req.collection.findOne({ _id: req.params.id });
    const { surveyId } = survey || {};
    if (!surveyId) return res.status(404).send('Survey not found');
    // AGGIUNGI GET DA GNOSIS
    res.json({ ...survey });
});

// Close survey
router.post('/:id/close', async (req, res) => {
    const survey = await req.collection.updateOne({ _id: req.params.id }, { $set: { closed: true } });
    // AGGIUNGI CLOSE DA GNOSIS
    res.json(survey);
});

// Create survey
router.post('/', async (req, res) => {
    const survey = await req.collection.insertOne(req.body);
    res.json(survey);
});

// Export the router
module.exports = router;