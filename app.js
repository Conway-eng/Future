const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors');

mongoose.connect('mongodb://localhost/futuristic-dashboard', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);

module.exports = app;
