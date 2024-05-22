const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression());

// Serve static files
app.use(express.static(path.join(__dirname, 'frontend', 'public')));

// Routes
const admissionStatusRoutes = require('./backend/routes/admissionStatusRoutes');
const certificateCalculatorRoutes = require('./backend/routes/certificateCalculatorRoutes');
const universitiesRoutes = require('./backend/routes/universitiesRoutes');

app.use('/api/admissionStatus', admissionStatusRoutes);
app.use('/api/certificateCalculator', certificateCalculatorRoutes);
app.use('/api/universities', universitiesRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
