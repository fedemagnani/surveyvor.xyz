// get route from express

const express = require('express');
const router = express.Router();
const { connectToMongoDB } = require('../../lib/mongodb/db');
const { ObjectId } = require('mongodb');
const { get_survey, add_respondent } = require('../../../utils/utils.js');

function format_survey(survey, survey_gnosis, req) {
    console.log(`$${survey_gnosis.reward_respondent_usd}`)
    survey.currency = survey_gnosis.currency_reward;
    survey.reward = survey_gnosis.reward_respondent;
    survey.reward_usd = `$${survey_gnosis.reward_respondent_usd}`;
    survey.budget = survey_gnosis.campaign_budget;
    survey.respondentsLeft = Math.ceil(survey.budget / survey.reward);
    survey.maximumRespondentsNumber = parseInt(survey.respondentsLeft) + parseInt(survey_gnosis.respondent_count);
    // survey.survey_link = survey_gnosis.survey_link;
    survey.start_date = survey_gnosis.start_date;
    survey.closed = survey.budget === 0;
    survey.ownerAddress = survey_gnosis.surveyprod_address;
    survey.owned = survey_gnosis.surveyprod_address == req.user_address
    return survey;
}

// Define middleware to connect to MongoDB and retrieve the collection
router.use(async (req, res, next) => {
    const { db } = await connectToMongoDB();
    const collection = db.collection('Survey');
    req.collection = collection;
    const { addressid, chainid } = req.headers;
    console.log(addressid, chainid);
    if (!addressid || !chainid) return res.status(400).send('Missing data');
    req.chain_id = 10200 || chainid; // TODO: da valutare
    req.user_address = addressid;
    next();
});

// Get surveys
router.get('/', async (req, res) => {
    const surveys = await req.collection.find({}).toArray();
    for (let i = 0; i < surveys.length; i++) {
        let id = surveys[i].surveyId;
        let survey_gnosis = await get_survey(id, req.chain_id);
        surveys[i] = format_survey(surveys[i], survey_gnosis, req);
    }
    res.json(surveys);
});

// Get survey by id
router.get('/:id', async (req, res) => {
    const id = new ObjectId(req.params.id);
    let survey = await req.collection.findOne({ _id: id });
    let _id = survey.surveyId;
    console.log(req.chain_id);
    let survey_gnosis = await get_survey(_id, req.chain_id);
    survey = format_survey(survey, survey_gnosis, req)
    res.json(survey);
});

router.post('/:id', async (req, res) => {
    const { id: surveyId } = req.params;
    const { data: iExecAddress, respondentAddress, review } = req.body;
    if (!iExecAddress || !respondentAddress || !surveyId) return res.status(400).send('Missing data');
    const { db } = await connectToMongoDB();
    const collection = db.collection('Answer');
    const { insertedId: mongoId } = await collection.insertOne({ surveyId, iExecAddress, respondentAddress, review });
    const { hash } = await add_respondent(surveyId, respondentAddress, iExecAddress, 1); // TODO: non arcodare il numero di risposte
    res.json({ mongoId, hash });
});

// Close survey
router.post('/:id/close', async (req, res) => {
    const survey = await req.collection.updateOne({ _id: req.params.id }, { $set: { closed: true } });
    // AGGIUNGI CLOSE DA GNOSIS
    res.json(survey);
});

// Create survey
router.post('/', async (req, res) => {
    const s = await req.collection.findOne({}, { sort: { surveyId: -1 } });
    let nextSurveyId = 0;
    if (s !== null) nextSurveyId = s.surveyId + 1;
    const survey = await req.collection.insertOne({ ...req.body, surveyId: nextSurveyId });
    res.json(survey);
});

// Export the router
module.exports = router;