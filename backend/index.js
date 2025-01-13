const express = require('express');
const cors = require('cors')
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const { authMiddleware } = require('./middlewares/authMiddleware');
const { initializeDatabase } = require('./util/db.js');
require('dotenv').config();
const port = process.env.PORT || 3001
const app = express();
app.use(cors());
app.use(express.json());

initializeDatabase();

app.use('/api/auth', authRoutes);
app.use('/api/events', authMiddleware, eventRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));