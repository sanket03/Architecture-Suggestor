const express = require('express');
const router = express.Router();
const prepareDataModule = require('../business_layer/prepareData')

router.get('/', (req,res) => {
    res.send(prepareDataModule.getArchitectureDetails())
});

module.exports = router;