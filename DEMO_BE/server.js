require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { API_PREFIX } = require('./constants');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Use API prefix from constants (can be overridden by process.env.API_PREFIX)
app.use(API_PREFIX, require('./routes/user.routes'));

// Global error handler
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () =>
    console.log('Server running on port ' + port)
);
