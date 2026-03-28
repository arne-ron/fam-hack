import React from "react";

const EventHero: React.FC = () => {
  return (
    <section className="event-hero">
      <div className="event-label">This week's event</div>
      <div className="event-card">
        <div className="event-details">
          <h1>End of Term Picnic</h1>
          <div className="event-meta">
            <span className="event-date">
              Friday, April 10, 2026 at 10:00 AM
            </span>
            <span className="event-location">@ The Meadows</span>
          </div>
          <p className="event-description">
            Celebrate the end of the semester at The Meadows. Bring your own
            snacks and drinks!
          </p>
          <div className="event-rsvp-info">
            <div className="attendee-avatars">
              {/* Simple circle placeholders */}
              <div className="avatar">A</div>
              <div className="avatar">B</div>
              <div className="avatar">+3</div>
            </div>
            <span className="rsvp-text">
              Alice, Bob, and 3 others are going
            </span>
          </div>
        </div>
        <div className="event-actions">
          <button className="rsvp-btn primary">I'm In!</button>
          <button className="rsvp-btn secondary">Maybe</button>
        </div>
      </div>
    </section>
  );
};

export default EventHero;
