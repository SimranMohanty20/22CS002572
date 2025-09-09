import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import RedirectHandler from './RedirectHandler'; // Add this line

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/s/:code" element={<RedirectHandler />} /> {/* Add this line */}
      </Routes>
    </Router>
  );
}

export default App;