const Event = require('../models/Event');


exports.getAllEvents = async (req, res) => {
    try {
      const filter = {};
      if(req.query.category) {
        filter.category = req.query.category;
      }
      if(req.query.ticketPrice) {
        filter.ticketPrice = { $lte: req.query.ticketPrice };
      }
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if(!event) {
      return res.status(404).json({error: 'Event not found'});
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createEvent = async (req, res) => {
  const { title, description, date, location, category, totalSeats, availableSeats, ticketPrice, imageUrl } = req.body;
  try {
    const newEvent = new Event({
      title,
      description,
      date,
      location,
      category,
      totalSeats,
      availableSeats,
      ticketPrice,
      imageUrl,
    });
    res.status(201).json(await newEvent.save());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  const { title, description, date, location, category, totalSeats, availableSeats, ticketPrice, imageUrl } = req.body;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, {
      title,
      description,
      date,
      location,
      category,
      totalSeats,
      availableSeats,
      ticketPrice,
      imageUrl
    }, { new: true });
    if(!updatedEvent) {
      return res.status(404).json({error: 'Event not found'});
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if(!deletedEvent) {
      return res.status(404).json({error: 'Event not found'});
    }
    res.status(200).json({message: 'Event deleted successfully'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


