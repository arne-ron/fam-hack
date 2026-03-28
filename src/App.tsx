import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import EventHero from "./components/EventHero";
import EventVoting from "./components/EventVoting";
import Calendar from "./components/Calendar";
import Availability from "./pages/Availability";
import SelectEventPreferences from "./select-event-preferences.tsx";
import "./App.css";

function HomePage() {
  return (
    <main className="home-content">
      <div className="main-column">
        <EventHero />
        <EventVoting />
      </div>
      <aside className="side-column">
        <Calendar />
      </aside>
    </main>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/availability" element={<Availability />} />
          {/* <Route path="/calendar" element={<HomePage />} /> */}
          <Route path="/preferences" element={<SelectEventPreferences />} />
        </Routes>
        <footer className="footer">
          <p>Built with ❤️ for FamHack 2026</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
