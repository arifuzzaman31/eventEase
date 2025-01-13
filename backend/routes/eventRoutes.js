const express = require('express');
const { createEvent,getAllEvents } = require('../controller/eventController');

const router = express.Router();

router.get('/', getAllEvents);
router.post('/', createEvent);

module.exports = router;
