// Import necessary modules and components
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; // Import BrowserRouter
import Header from './Components/Header';
import Footer from './Components/Footer';
import ContactUs from './Pages/ContactUs.ejs';
import Home from './Pages/Home.ejs';
import News from './Pages/News.ejs';
import AdmissionStatus from './Pages/AdmissionStatus/StatusMain.ejs';
import CertificateCalculator from './Pages/CertificateCalculator/American.ejs';
import NationalUniversitesGuide from './Pages/UniversitesGuide/GuideMain.ejs'

// Define the routes for different pages
const App = () => (
  <Router> {/* Wrap your routes with Router */}
    <>
      <Header />
      {/* Define your routes */}
      <Route exact path="/" component={Home} />
      <Route path="/contact" component={ContactUs} />
      <Route path="/news" component={News} />
      <Route path="/admission-status" component={AdmissionStatus} />
      <Route path="/certificate-calculator" component={CertificateCalculator} />
      <Route path="/universities/guide" component={NationalUniversitesGuide} />
      <Footer />
    </>
  </Router>
);

export default App;
