const express = require('express');
const path = require('path');

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'frontend', 'src', 'pages'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'frontend', 'public')));

// Main route
app.get('/', (req, res) => {
    res.render('Index');
});

// Home route
app.get('/Home', (req, res) => {
    res.render('Home');
});

// Register route
app.get('/Register', (req, res) => {
    res.render('Register');
});

// Login & Signup routes
app.get('/auth/Login', (req, res) => {
    res.render('Login');
});

app.get('/auth/Signup', (req, res) => {
    res.render('Signup');
});

app.get('/auth/facebook', (req, res) => {
    res.render('comingsoon');
});

app.get('/auth/google', (req, res) => {
    res.render('comingsoon');
});

// Profile routes
app.get('/profile', (req, res) => {
    res.render('profile');
});


// Guides routes
app.get('/UniversitiesGuide', (req, res) => {
    res.render('UniversitesGuide/GuideMain');
});

app.get('/UniversitiesGuide/UGRAD', (req, res) => {
    res.render('UniversitesGuide/UGRADGuide');
});

app.get('/UniversitiesGuide/PGRAD', (req, res) => {
    res.render('ComingSoon');
});

app.get('/UniversitiesGuide/UGRAD/National', (req, res) => {
    res.render('UniversitesGuide/NationalGuide');
});

app.get('/UniversitiesGuide/UGRAD/National/Normal', (req, res) => {
    res.render('UniversitesGuide/NationalUniverites/Normal');
});

app.get('/UniversitiesGuide/UGRAD/National/International', (req, res) => {
    res.render('UniversitesGuide/NationalUniverites/International');
});

app.get('/UniversitiesGuide/UGRAD/National/Affiliated', (req, res) => {
    res.render('UniversitesGuide/NationalUniverites/Affiliated');
});

app.get('/UniversitiesGuide/UGRAD/public', (req, res) => {
    res.render('comingsoon');
});

app.get('/UniversitiesGuide/UGRAD/private', (req, res) => {
    res.render('comingsoon');
});

app.get('/UniversitiesGuide/UGRAD/international', (req, res) => {
    res.render('comingsoon');
});

app.get('/UniversitiesGuide/UGRAD/special', (req, res) => {
    res.render('comingsoon');
});

app.get('/UniversitiesGuide/UGRAD/tech', (req, res) => {
    res.render('comingsoon');
});

app.get('/UniversitiesGuide/UGRAD/inst', (req, res) => {
    res.render('comingsoon');
});

// Universites routes
// International NU
app.get('/UniversitiesGuide/UGRAD/National/International/AIU', (req, res) => {
    res.render('Universites/National/AIU');
});

app.get('/UniversitiesGuide/UGRAD/National/International/KSIU', (req, res) => {
    res.render('comingsoon');
});

app.get('/UniversitiesGuide/UGRAD/National/International/GU', (req, res) => {
    res.render('comingsoon');
});

app.get('/UniversitiesGuide/UGRAD/National/International/NMU', (req, res) => {
    res.render('comingsoon');
});
// Normal NU
app.get('/UniversitiesGuide/UGRAD/National/Normal/EUI', (req, res) => {
    res.render('comingsoon');
});

app.get('/UniversitiesGuide/UGRAD/National/Normal/UFE', (req, res) => {
    res.render('comingsoon');
});

app.get('/UniversitiesGuide/UGRAD/National/Normal/NU', (req, res) => {
    res.render('comingsoon');
});

app.get('/UniversitiesGuide/UGRAD/National/Normal/EELU', (req, res) => {
    res.render('comingsoon');
});

app.get('/UniversitiesGuide/UGRAD/National/Normal/ENU', (req, res) => {
    res.render('comingsoon');
});
// Affiliated NU
app.get('/UniversitiesGuide/UGRAD/National/Affiliated/MansNU', (req, res) => {
    res.render('comingsoon');
});

app.get('/UniversitiesGuide/UGRAD/National/Affiliated/HNU', (req, res) => {
    res.render('comingsoon');
});

app.get('/UniversitiesGuide/UGRAD/National/Affiliated/BNU', (req, res) => {
    res.render('comingsoon');
});

app.get('/UniversitiesGuide/UGRAD/National/Affiliated/BSNU', (req, res) => {
    res.render('comingsoon');
});

app.get('/UniversitiesGuide/UGRAD/National/Affiliated/SVNU', (req, res) => {
    res.render('comingsoon');
});

app.get('/UniversitiesGuide/UGRAD/National/Affiliated/ZNU', (req, res) => {
    res.render('comingsoon');
});

app.get('/UniversitiesGuide/UGRAD/National/Affiliated/MiniaNU', (req, res) => {
    res.render('comingsoon');
});

app.get('/UniversitiesGuide/UGRAD/National/Affiliated/MenofiaNU', (req, res) => {
    res.render('comingsoon');
});

app.get('/UniversitiesGuide/UGRAD/National/Affiliated/EPNU', (req, res) => {
    res.render('comingsoon');
});

app.get('/UniversitiesGuide/UGRAD/National/Affiliated/AlexNU', (req, res) => {
    res.render('comingsoon');
});

app.get('/UniversitiesGuide/UGRAD/National/Affiliated/AssuitNU', (req, res) => {
    res.render('comingsoon');
});

app.get('/UniversitiesGuide/UGRAD/National/Affiliated/NINU', (req, res) => {
    res.render('comingsoon');
});

app.get('/UniversitiesGuide/UGRAD/National/Affiliated/SNU', (req, res) => {
    res.render('comingsoon');
});

app.get('/UniversitiesGuide/UGRAD/National/Affiliated/ASNU', (req, res) => {
    res.render('comingsoon');
});

app.get('/UniversitiesGuide/UGRAD/National/Affiliated/AswanNU', (req, res) => {
    res.render('comingsoon');
});

app.get('/UniversitiesGuide/UGRAD/National/Affiliated/FNU', (req, res) => {
    res.render('comingsoon');
});

app.get('/UniversitiesGuide/UGRAD/National/Affiliated/DNU', (req, res) => {
    res.render('comingsoon');
});

app.get('/UniversitiesGuide/UGRAD/National/Affiliated/KSNU', (req, res) => {
    res.render('comingsoon');
});

// Status routes
app.get('/AdmissionStatus', (req, res) => {
    res.render('AdmissionStatus/StatusMain');
});

app.get('/AdmissionStatus/UGRAD', (req, res) => {
    res.render('AdmissionStatus/UGRADStatus');
});

app.get('/AdmissionStatus/PGRAD', (req, res) => {
    res.render('ComingSoon');
});

app.get('/AdmissionStatus/UGRAD/National', (req, res) => {
    res.render('AdmissionStatus/National');
});

app.get('/AdmissionStatus/UGRAD/public', (req, res) => {
    res.render('comingsoon');
});

app.get('/AdmissionStatus/UGRAD/private', (req, res) => {
    res.render('comingsoon');
});

app.get('/AdmissionStatus/UGRAD/international', (req, res) => {
    res.render('comingsoon');
});

app.get('/AdmissionStatus/UGRAD/special', (req, res) => {
    res.render('comingsoon');
});

app.get('/AdmissionStatus/UGRAD/tech', (req, res) => {
    res.render('comingsoon');
});

app.get('/AdmissionStatus/UGRAD/inst', (req, res) => {
    res.render('comingsoon');
});

// Scholarships routes
app.get('/Scholarships', (req, res) => {
    res.render('Scholarships/ScholarshipsMain');
});

app.get('/Scholarships/UGRAD', (req, res) => {
    res.render('Scholarships/UGRADScholarships');
});

app.get('/Scholarships/PGRAD', (req, res) => {
    res.render('ComingSoon');
});

// Certificates routes
app.get('/CertificatesCalculator', (req, res) => {
    res.render('CertificatesCalculator/CertificatesMain');
});

app.get('/CertificatesCalculator/American', (req, res) => {
    res.render('CertificatesCalculator/American');
});

app.get('/CertificatesCalculator/IGCSE', (req, res) => {
    res.render('CertificatesCalculator/IGCSE');
});

app.get('/CertificatesCalculator/Azhari', (req, res) => {
    res.render('comingsoon');
});

app.get('/CertificatesCalculator/STEM', (req, res) => {
    res.render('comingsoon');
});

app.get('/CertificatesCalculator/Nile', (req, res) => {
    res.render('comingsoon');
});

app.get('/CertificatesCalculator/Saudi', (req, res) => {
    res.render('comingsoon');
});

app.get('/CertificatesCalculator/Kuwaiti', (req, res) => {
    res.render('comingsoon');
});

app.get('/CertificatesCalculator/Bahraini', (req, res) => {
    res.render('comingsoon');
});

// News routes
app.get('/News', (req, res) => {
    res.render('News');
});

// Contuctus routes
app.get('/ContactUs', (req, res) => {
    res.render('ContactUs');
});

// Coming Soon page routes
app.get('/CommingSoon', (req, res) => {
    res.render('CommingSoon');
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
