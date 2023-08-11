const express = require('express');
const router = express.Router();
const {getTranscations,addTranscation,deleteTranscation} = require('../controllers/transcations');

router.route('/')
.get(getTranscations)
.post(addTranscation);

router.delete('/:id',deleteTranscation);

module.exports = router;