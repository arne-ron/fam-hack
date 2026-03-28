import React from "react";

const Calendar: React.FC = () => {
  return (
    <section className="calendar-section">
      <div className="calendar-header">
        <h2>March / April 2026</h2>
        <button className="add-event-btn">+ Add Event</button>
      </div>
      <div className="calendar-grid">
        <div className="day-name">Mon</div>
        <div className="day-name">Tue</div>
        <div className="day-name">Wed</div>
        <div className="day-name">Thu</div>
        <div className="day-name">Fri</div>
        <div className="day-name">Sat</div>
        <div className="day-name">Sun</div>

        {/* Simplified grid placeholder starting from Mar 23 */}
        {[23, 24, 25, 26, 27, 28, 29].map((d) => (
          <div key={d} className="calendar-day disabled">
            {d}
          </div>
        ))}
        <div className="calendar-day event academic">
          <span className="day-num">30</span>
          <span className="event-label">Study @ Library</span>
        </div>
        <div className="calendar-day">
          <span className="day-num">31</span>
        </div>
        <div className="calendar-day current-month">
          <span className="day-num">1</span>
        </div>
        <div className="calendar-day current-month">
          <span className="day-num">2</span>
        </div>
        <div className="calendar-day current-month">
          <span className="day-num">3</span>
        </div>
        <div className="calendar-day current-month">
          <span className="day-num">4</span>
        </div>
        <div className="calendar-day current-month event social">
          <span className="day-num">5</span>
          <span className="event-label">Pub Night</span>
        </div>
        {[6, 7, 8, 9].map((d) => (
          <div key={d} className="calendar-day current-month">
            <span className="day-num">{d}</span>
          </div>
        ))}
        <div className="calendar-day current-month event tradition highlighted">
          <span className="day-num">10</span>
          <span className="event-label">Family Picnic</span>
        </div>
      </div>
    </section>
  );
};

export default Calendar;
