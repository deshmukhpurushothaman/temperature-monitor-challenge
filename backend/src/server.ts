import express from 'express';
import { connectToDatabase } from './database/connect';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { Temperature } from './models/temperature.model';
import temperatureRoutes from './routes/temperature.routes';

// Environment Variables
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

connectToDatabase();

const httpServer = createServer(app);

// WebSocket Server
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

// Middleware to add WebSocket `io` to the request object
app.use((req: any, res, next) => {
  req.io = io; // Attach `io` to request object
  next();
});

// Routes
app.use('/api', temperatureRoutes);

io.on('connection', (socket) => {
  console.log('A client connected via WebSocket ', socket.id); // Logs connection
  socket.emit('connection_ack', {
    message: 'Connection established successfully!',
  }); // Sends acknowledgment
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

// Emit Temperature Readings
setInterval(async () => {
  const temperature = parseFloat((15 + Math.random() * 15).toFixed(2)); // Random temperature (15-30°C)
  const timestamp = new Date();

  const newReading = new Temperature({ temperature, timestamp });
  await newReading.save();

  io.emit('temperature_reading', { id: newReading.id, temperature, timestamp });
}, 1000 * 5);

// Start HTTP Server
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
