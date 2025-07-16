import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './landing.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Add more routes here as you create new pages */}
        {/* Example: */}
        {/* <Route path="/book" element={<BookingPage />} /> */}
        {/* <Route path="/games" element={<GamesPage />} /> */}
        {/* <Route path="/profile" element={<ProfilePage />} /> */}
      </Routes>
    </Router>
  );
};

export default App
