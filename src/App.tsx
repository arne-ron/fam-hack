import Navbar from "./components/Navbar";
import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SelectEventPreferences from "./select-event-preferences.tsx";
import Home from "./Home.tsx";

function App() {
    return (
        <BrowserRouter>
            <div className="app-container">
                <Navbar/>
                <main className="home-content w-full">
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/preferences" element={<SelectEventPreferences />} />
                    </Routes>
                </main>
                <footer className="footer">
                    <p>Built with ❤️ for FamHack 2026</p>
                </footer>
            </div>

        </BrowserRouter>
    );
}

export default App;
