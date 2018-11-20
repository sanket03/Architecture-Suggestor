const express = require('express');
const router = express.Router();
const prepareDataModule = require('../business_layer/prepareData')

router.get('/GetArchitecturesList', (req,res) => {
    prepareDataModule.getArchitecturesList().then(data => {
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    })
});

router.get('/GetArchitectureDetails/:architectureId', (req,res) => {
    prepareDataModule.getArchitectureDetails(req.params.architectureId).then(data => {
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    })
});

router.get('/GetQuestionDetails/:architectureId', (req,res) => {
    prepareDataModule.getQuestionDetails(req.params.architectureId).then(data => {
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    })
});

router.get('/GetQuestionEntityMapping', (req,res) => {
    prepareDataModule.getQuestionEntityMapping().then(data => {
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    })
});

module.exports = router;