import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import LandingPage from './Pages/LandingPage';
import About from './Pages/About';
import RegistrationPage from './Pages/RegPage';
import ContactPage from './Pages/ContactPage';
import Careers from './Pages/Careers';
import BriefHistory from './Pages/BriefHistory';
import Blog from './Pages/Blog';
import Gallery from './Pages/Gallery';
import Testimonial from './Pages/Testimonial';
import AdminDashboard from './Pages/AdminDashboard';
import InboxPage from './Pages/InboxPage';
import EditEnquiry from './Pages/EditEnquiry';
import EnquiryList from './Pages/EnquiryList';
import EditTestimonialList from './Pages/EditTestimonialList';
import TestimonialList from './Pages/TestimonialList';
import AddBlogPost from './Pages/AddBlogPost';
import BlogList from './Pages/BlogList';
import EditBlogPost from './Pages/EditBlogPost';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
      <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/brief_history" element={<BriefHistory />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/testimonials" element={<Testimonial />} />
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/enquiry_list" element={<EnquiryList />} />
        <Route path="/edit_enquiry/:id" element={<EditEnquiry />} /> {/* Updated route */}
        <Route path="/testimonial_list" element={<TestimonialList />} />
        <Route path="/edit_testimonial_list/:testimonialId" element={<EditTestimonialList />} />
        <Route path="/add_blog_post" element={<AddBlogPost />} />
        <Route path="/blog_list" element={<BlogList />} />
        <Route path="/edit_blog_post/:slug" element={<EditBlogPost />} />
      </Routes>
      <Footer />
    </Router>
      </main>
    </div>
  );
};

export default App;
