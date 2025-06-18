import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import usersRouter from './routes/users.js';
import lodgingsRouter from './routes/lodgings.js';
import bookingsRouter from './routes/bookings.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connected successfully ✅');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT} 🚀`);
    });
}

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the API! Explore the endpoints for users, lodgings, and bookings.');
});

app.use('/api/users', usersRouter);
app.use('/api/lodgings', lodgingsRouter);
app.use('/api/bookings', bookingsRouter);

// Start the server
startServer();