import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer'
import LandingPage from './Pages/LandingPage';
import About from './Pages/About';
import RegistrationPage from  './Pages/RegPage';
import ContactPage from './Pages/ContactPage';
import Careers from './Pages/Careers'
import BriefHistory from './Pages/BriefHistory';
import Blog from './Pages/Blog';
import Gallery from './Pages/Gallery';
import Testimonial from './Pages/Testimonial'


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/careers" element={<Careers/>} />
        <Route path="/brief_history" element={<BriefHistory/>} />
        <Route path="/blog" element={<Blog/>} />
        <Route path="/gallery" element={<Gallery/>} />
        <Route path="/testimonials" element={<Testimonial/>} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
