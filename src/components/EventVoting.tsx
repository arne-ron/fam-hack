import React from "react";

const EventVoting: React.FC = () => {
  const suggestions = [
    { id: "quiz", name: "Pub Quiz 🍻", suggestedBy: "?" },
    { id: "games", name: "Board Game Night 🎲", suggestedBy: "?" },
    { id: "hiking", name: "Hiking Trip 🥾", suggestedBy: "?" },
  ];

  return (
    <section className="voting-section">
      <div className="event-label">Suggested Activities</div>
      <div className="voting-card">
        <div className="voting-header">
          <h2>What's next?</h2>
          <p>Choose an activity or suggest a time below.</p>
        </div>

        <div className="suggestion-list">
          {suggestions.map((event) => (
            <div key={event.id} className="suggestion-item">
              <div className="suggestion-info">
                <span className="suggestion-name">{event.name}</span>
                <span className="suggestion-meta">
                  Suggested by {event.suggestedBy}
                </span>
              </div>
              <div className="suggestion-actions">
                <button
                  className="action-btn vote-time"
                  onClick={() => (window.location.href = "/availability")}
                >
                  Vote Date and Time
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="voting-footer">
          <button className="suggest-btn-outline full-width">
            + Suggest New Activity
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventVoting;
