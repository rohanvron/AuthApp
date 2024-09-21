// express server setup
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// auth routes
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(cors());
app.use(express.json());

// connecting to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
