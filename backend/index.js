const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const WebSocket = require('ws');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const { authMiddleware } = require('./middlewares/authMiddleware');
const { initializeDatabase, initializeSocket } = require('./util/db.js');
require('dotenv').config();

const port = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

let server = http.createServer(app);
// var io = new Server(server);
const wss = new WebSocket.Server({ port: 8181 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('connected with wss');
});
// Initialize the database
initializeDatabase();

// Serve static files
app.use(express.static(__dirname + '/public'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', authMiddleware, eventRoutes);

// Serve index.html for the /io route
app.get('/io', (req, res) => {
    return res.sendFile(__dirname + '/public/index.html');
});

// WebSocket connection
// initializeSocket(io)


// Start the server
server.listen(port, () => console.log(`Server running on port ${port}`));
