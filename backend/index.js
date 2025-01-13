const express = require('express');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const { authMiddleware } = require('./middlewares/authMiddleware');
const { initializeDatabase } = require('./util/db.js');

require('dotenv').config();

const app = express();
app.use(express.json());

initializeDatabase();

app.use('/api/auth', authRoutes);
app.use('/api/events', authMiddleware, eventRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));