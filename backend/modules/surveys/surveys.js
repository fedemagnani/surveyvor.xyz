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
    //TODO: pass the chainID and the addressID
    req.chain_id = 10200;
    req.user_address = "0xD955570869dA86D0af870bbFfF812CD539cFc51d";
    req.collection = collection;
    next();
});

// Get surveys
router.get('/', async (req, res) => {
    const surveys = await req.collection.find({}).toArray();
    for (let i = 0; i < surveys.length; i++) {
        let id = surveys[i].surveyId;
        let survey_gnosis = await get_survey(id, req.chain_id);
        surveys[i] = format_survey(surveys[i], survey_gnosis, req)
        // surveys[i].currency = survey_gnosis.currency_reward;
        // surveys[i].reward = survey_gnosis.reward_respondent;
        // surveys[i].budget = survey_gnosis.campaign_budget;
        // surveys[i].respondentsLeft = surveys[i].budget/surveys[i].reward;
        // surveys[i].maximumRespondentsNumber = parseInt(surveys[i].respondentsLeft) + parseInt(survey_gnosis.respondent_count);
        // // survey.survey_link = survey_gnosis.survey_link;
        // surveys[i].start_date = survey_gnosis.start_date;
        // surveys[i].closed = surveys[i].budget===0;
        // surveys[i].ownerAddress = survey_gnosis.surveyprod_address;
        // surveys[i].owned = survey_gnosis.surveyprod_address == req.user_address;
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

    // survey.currency = survey_gnosis.currency_reward;
    // survey.reward = survey_gnosis.reward_respondent;
    // survey.budget = survey_gnosis.campaign_budget;
    // survey.respondentsLeft = survey.budget/survey.reward;
    // survey.maximumRespondentsNumber = parseInt(survey.respondentsLeft) + parseInt(survey_gnosis.respondent_count);
    // // survey.survey_link = survey_gnosis.survey_link;
    // survey.start_date = survey_gnosis.start_date;
    // survey.closed = survey.budget===0;
    // survey.ownerAddress = survey_gnosis.surveyprod_address;
    // survey.owned = survey_gnosis.surveyprod_address == req.user_address
    /* const { surveyId } = survey || {};
    if (!surveyId) return res.status(404).send('Survey not found'); */
    // AGGIUNGI GET DA GNOSIS
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
    const survey = await req.collection.insertOne(req.body);
    res.json(survey);
});

// Export the router
module.exports = router;