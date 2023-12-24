const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { dbConnection } = require('./database/config.mongo');

// Load environment variables from .env file
require('dotenv').config();

// Create Express server
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(morgan('dev'));
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));

// MongoDB
dbConnection();

// Routes
app.use('/', require('./routes/index.route'));
app.use('/api', require('./routes/auth.route'));
app.use('/api', require('./routes/publicacion.route'));

// Port assignment
const server = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

module.exports = {
    app,
    server,
};