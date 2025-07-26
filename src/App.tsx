import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        {/* Add more routes here as you create new pages */}
        {/* Example: */}
        {/* <Route path="/book" element={<BookingPage />} /> */}
        {/* <Route path="/games" element={<GamesPage />} /> */}
        {/* <Route path="/profile" element={<ProfilePage />} /> */}
      </Routes>
    </Router>
  );
}
