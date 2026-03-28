import EventHero from "./components/EventHero.tsx";
import EventVoting from "./components/EventVoting.tsx";
import Calendar from "./components/Calendar.tsx";

export default function Home() {

    return (
        <>
            <div className="main-column">
                <EventHero/>
                <EventVoting/>

            </div>
            <aside className="side-column">
                <Calendar/>
            </aside>
        </>
        )
}
