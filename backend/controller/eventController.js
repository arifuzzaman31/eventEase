const Event = require('../model/Event');

exports.createEvent = (req, res) => {
    const { name, date, location, maxAttendees } = req.body;
    let createdBy = req.user?.id
    Event.create({ name, date, location, maxAttendees, createdBy }, (err, event) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json(event);
    });
};

exports.getEventById = (req, res) => {
    const { id } = req.params;

    Event.findById(id, (err, event) => {
        if (err) {
            return res.status(500).json({ error: 'Database error.' });
        }
        if (!event) {
            return res.status(404).json({ error: 'Event not found.' });
        }
        res.json(event);
    });
};

exports.getAllEvents = (req, res) => {
    Event.findAll((err, events) => {
        if (err) {
            return res.status(500).json({ error: 'Database error.' });
        }
        res.json(events);
    });
};

exports.updateEvent = (req, res) => {
    const { id } = req.params;
    const { name, date, location, maxAttendees } = req.body;

    Event.updateById(id, { name, date, location, maxAttendees }, (err, result) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Event not found.' });
        }
        res.json({ message: 'Event updated successfully.' });
    });
};

exports.deleteEvent = (req, res) => {
    const { id } = req.params;

    Event.deleteById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error.' });
        }
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Event not found.' });
        }
        res.json({ message: 'Event deleted successfully.' });
    });
};
