import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface FamilyEvent {
  date: string; // ISO string YYYY-MM-DD
  title: string;
  type: 'academic' | 'social' | 'tradition';
}

const mockEvents: FamilyEvent[] = [
  { date: '2026-03-30', title: 'Study @ Library', type: 'academic' },
  { date: '2026-04-05', title: 'Pub Night', type: 'social' },
  { date: '2026-04-10', title: 'Family Picnic', type: 'tradition' },
];

const FamilyCalendar: React.FC = () => {
  const [value, onChange] = useState<Value>(new Date(2026, 2, 28)); // Mar 28, 2026

  const tileClassName = ({ date, view }: { date: Date, view: string }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      const event = mockEvents.find(e => e.date === dateString);
      if (event) {
        return `event-tile ${event.type}`;
      }
    }
    return null;
  };

  const tileContent = ({ date, view }: { date: Date, view: string }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      const event = mockEvents.find(e => e.date === dateString);
      if (event) {
        return <div className="event-dot"></div>;
      }
    }
    return null;
  };

  return (
    <section className="calendar-section">
      <div className="calendar-header">
        <h2>Family Calendar</h2>
        <button className="add-event-btn">+ Add Event</button>
      </div>
      <div className="calendar-container">
        <Calendar 
          onChange={onChange} 
          value={value} 
          tileClassName={tileClassName}
          tileContent={tileContent}
          className="custom-react-calendar"
        />
      </div>
      <div className="upcoming-list">
        <h3>Upcoming This Month</h3>
        {mockEvents.map(event => (
          <div key={event.date} className={`upcoming-item ${event.type}`}>
            <span className="event-date-small">{new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
            <span className="event-title-small">{event.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FamilyCalendar;
