const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

dotenv.config();

const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const bookingRoutes = require('./routes/booking');

const app = express();
app.use(cors());
app.use(express.json());





// console.log("authRoutes:", typeof authRoutes);
// console.log("eventRoutes:", typeof eventRoutes);
// console.log("bookingRoutes:", typeof bookingRoutes);

// Routes 
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || {
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT,() => {
  console.log(`Server is running on port ${PORT}`);
});



//VJlOvTjEXJyH9hOP