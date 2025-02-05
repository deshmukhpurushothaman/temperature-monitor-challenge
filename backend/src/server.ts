import express from 'express';
import { connectToDatabase } from './database/connect';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { Temperature } from './models/temperature.model';
import temperatureRoutes from './routes/temperature.routes';

// Environment Variables
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

connectToDatabase();

// Routes
app.use('/api', temperatureRoutes);

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
  const id = uuidv4();

  const newReading = new Temperature({ id, temperature, timestamp });
  await newReading.save();

  io.emit('temperature_reading', { id, temperature, timestamp });
}, 2000);

// Start HTTP Server
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
