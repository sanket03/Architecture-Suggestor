const express = require('express');
const router = express.Router();
const prepareDataModule = require('../business_layer/prepareData');
const {    
    architectureDetails,
    solutionsList,
    questionEntityMapping,
    questionDetails } =  require('../utilities/data');


// ******* Uncomment this during prod *****
// router.get('/GetArchitecturesList', (req,res) => {
//     prepareDataModule.getArchitecturesList().then(data => {
//         res.setHeader('Content-Type', 'application/json');
//         res.send(JSON.stringify(data));
//     })
// });

// router.get('/GetArchitectureDetails/:architectureId', (req,res) => {
//     prepareDataModule.getArchitectureDetails(req.params.architectureId).then(data => {
//         res.setHeader('Content-Type', 'application/json');
//         res.send(data);
//     })
// });

// router.get('/GetQuestionDetails/:architectureId', (req,res) => {
//     prepareDataModule.getQuestionDetails(req.params.architectureId).then(data => {
//         res.setHeader('Content-Type', 'application/json');
//         res.send(data);
//     })
// });

// router.get('/GetQuestionEntityMapping', (req,res) => {
//     prepareDataModule.getQuestionEntityMapping().then(data => {
//         res.setHeader('Content-Type', 'application/json');
//         res.send(data);
//     })
// });


// ******* Comment this during prod *****
router.get('/GetArchitecturesList', (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(solutionsList));
});

router.get('/GetArchitectureDetails/:architectureId', (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(architectureDetails[req.params.architectureId]));
});

router.get('/GetQuestionDetails/:architectureId', (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(questionDetails[req.params.architectureId]);
});

router.get('/GetQuestionEntityMapping', (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(questionEntityMapping);
});

module.exports = router;