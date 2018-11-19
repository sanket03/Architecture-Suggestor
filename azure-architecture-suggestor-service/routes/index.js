const express = require('express');
const router = express.Router();
const prepareDataModule = require('../business_layer/prepareData')

router.get('/', (req,res) => {
    prepareDataModule.getArchitectureDetails().then(data => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(data));
    })
});

module.exports = router;