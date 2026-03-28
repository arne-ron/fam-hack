import Navbar from "./components/Navbar";
import EventHero from "./components/EventHero";
import Calendar from "./components/Calendar";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="home-content">
        <div className="main-column">
          <EventHero />
        </div>
        <aside className="side-column">
          <Calendar />
          <div className="quick-stats">
            <h3>Quick Stats</h3>
            <div className="stat">
              <span>Members Active</span>
              <strong>12 / 15</strong>
            </div>
            <div className="stat">
              <span>Next Event</span>
              <strong>12 Days</strong>
            </div>
          </div>
        </aside>
      </main>
      <footer className="footer">
        <p>Built with ❤️ for FamHack 2026</p>
      </footer>
    </div>
  );
}

export default App;
