import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import LoadingSpinner from './../Components/LoadingSpinner';

const Hero = lazy(() => import('./../Components/Hero')); // Lazy load
const PopupReview = lazy(() => import('../Components/PopupReview')); // Lazy load
const FeaturesSection = lazy(() => import('./../Components/FeaturesSection')); // Lazy load
const CallToActionSection = lazy(() => import('./../Components/CallToActionSection')); // Lazy load

const LandingPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Suspense fallback={<LoadingSpinner />}>
        <PopupReview 
          message="Check out our latest reviews!" 
          showDuration={3000}
          hideDuration={20000}
          linkTo="/testimonials" 
        />
      </Suspense>

      {/* Hero Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <Hero />
      </Suspense>

      {/* Features Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <FeaturesSection />
      </Suspense>

      {/* Call to Action Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <CallToActionSection />
      </Suspense>
    </div>
  );
};

export default LandingPage;
