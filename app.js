const express = require('express');
const path = require('path');

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'frontend', 'src', 'pages'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'frontend', 'public')));

// Define routes
app.get('/', (req, res) => {
    res.render('Home');
});

app.get('/AdmissionStatus/National', (req, res) => {
    res.render('AdmissionStatus/National');
});

app.get('/AdmissionStatus/StatusMain', (req, res) => {
    res.render('AdmissionStatus/StatusMain');
});

app.get('/AdmissionStatus/UGRADStatus', (req, res) => {
    res.render('AdmissionStatus/UGRADStatus');
});

app.get('/CertificateCalculator/American', (req, res) => {
    res.render('CertificateCalculator/American');
});

app.get('/CertificateCalculator/CertificatesMain', (req, res) => {
    res.render('CertificateCalculator/CertificatesMain');
});

app.get('/CertificateCalculator/Igcse', (req, res) => {
    res.render('CertificateCalculator/Igcse');
});

app.get('/Universities/National/Aiu', (req, res) => {
    res.render('Universities/National/Aiu');
});

app.get('/UniversitiesGuide/NationalUniversites/Affiliated', (req, res) => {
    res.render('UniversitiesGuide/NationalUniversites/Affiliated');
});

app.get('/UniversitiesGuide/NationalUniversites/international', (req, res) => {
    res.render('UniversitiesGuide/NationalUniversites/international');
});

app.get('/UniversitiesGuide/NationalUniversites/normal', (req, res) => {
    res.render('UniversitiesGuide/NationalUniversites/normal');
});

app.get('/UniversitiesGuide/GuideMain', (req, res) => {
    res.render('UniversitiesGuide/GuideMain');
});

app.get('/UniversitiesGuide/nationalguide', (req, res) => {
    res.render('UniversitiesGuide/nationalguide');
});

app.get('/UniversitiesGuide/ugradguide', (req, res) => {
    res.render('UniversitiesGuide/ugradguide');
});

app.get('/CommingSoon', (req, res) => {
    res.render('CommingSoon');
});

app.get('/ContactUs', (req, res) => {
    res.render('ContactUs');
});

app.get('/News', (req, res) => {
    res.render('News');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
