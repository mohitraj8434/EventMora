const express = require('express');
const router = express.Router();
const { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { protect, admin } = require('../middleware/auth');

console.log("protect:", typeof protect);
console.log("admin:", typeof admin);
console.log("updateEvent:", typeof updateEvent);

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', protect, admin, createEvent);
router.put('/:id', protect, admin, updateEvent);

router.delete('/:id', protect, admin, deleteEvent);

module.exports = router;