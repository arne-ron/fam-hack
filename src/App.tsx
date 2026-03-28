import Navbar from "./components/Navbar";
import EventHero from "./components/EventHero";
import EventVoting from "./components/EventVoting";
import Calendar from "./components/Calendar";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="home-content">
        <div className="main-column">
          <EventHero />
          <EventVoting />
        </div>
        <aside className="side-column">
          <Calendar />
        </aside>
      </main>
      <footer className="footer">
        <p>Built with ❤️ for FamHack 2026</p>
      </footer>
    </div>
  );
}

export default App;
