import React, { useState } from 'react';
import { login, getCalendarEvents, suggestOptimalTimes, type CalendarEvent } from '../services/outlookService';
import { loginGoogle, getGoogleCalendarEvents } from '../services/googleService';
import './Availability.css';

const Availability: React.FC = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<{ start: string; score: number }[]>([]);
  const [account, setAccount] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSyncOutlook = async () => {
    setIsSyncing(true);
    setError(null);
    try {
      const userAccount = await login();
      if (userAccount) {
        setAccount({ name: userAccount.username, type: 'Outlook' });
        const start = new Date().toISOString();
        const end = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
        const fetchedEvents = await getCalendarEvents(start, end);
        setEvents(fetchedEvents);
        setSuggestions(suggestOptimalTimes([fetchedEvents], 60));
      }
    } catch (err: any) {
      setError(err.message || "Outlook Sync failed");
    } finally { setIsSyncing(false); }
  };

  const handleSyncGoogle = async () => {
    setIsSyncing(true);
    setError(null);
    try {
      const token = await loginGoogle();
      if (token) {
        setAccount({ name: "Google Account", type: 'Google' });
        const start = new Date().toISOString();
        const end = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
        const fetchedEvents = await getGoogleCalendarEvents(start, end);
        setEvents(fetchedEvents);
        setSuggestions(suggestOptimalTimes([fetchedEvents], 60));
      }
    } catch (err: any) {
      console.error("Google Sync Error:", err);
      setError(err?.message || err || "Google Sync failed.");
    } finally { setIsSyncing(false); }
  };

  return (
    <div className="availability-page">
      <header className="page-header">
        <h1>Family Availability</h1>
        <p>Sync your calendar to find the best time for everyone.</p>
      </header>

      {error && <div className="error-banner">⚠️ {error}</div>}

      <div className="availability-container">
        <section className="sync-section">
          <div className="card">
            <h2>Your Schedule</h2>
            {account ? (
              <div className="status-connected">
                <span className="user-email">Connected via {account.type} as {account.name}</span>
                <p>{events.length} events synced for the next 7 days.</p>
              </div>
            ) : (
              <p>Connect your Outlook or Google calendar to share your availability with the family.</p>
            )}
            
            <div className="sync-actions">
              <button className="sync-btn outlook" onClick={handleSyncOutlook} disabled={isSyncing}>
                {isSyncing ? 'Syncing...' : account?.type === 'Outlook' ? 'Resync Outlook' : 'Connect Outlook'}
              </button>
              <button className="sync-btn google" onClick={handleSyncGoogle} disabled={isSyncing}>
                {isSyncing ? 'Syncing...' : account?.type === 'Google' ? 'Resync Google' : 'Connect Google'}
              </button>
            </div>
          </div>
        </section>

        <section className="suggestions-section">
          <div className="card">
            <h2>Suggested Meeting Times</h2>
            <div className="suggestions-list">
              {suggestions.length > 0 ? (
                suggestions.map((s, i) => (
                  <div key={i} className="suggestion-card">
                    <div className="time-info">
                      <span className="day">{new Date(s.start).toLocaleDateString('en-GB', { weekday: 'long' })}</span>
                      <span className="time">{new Date(s.start).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="score-badge">{Math.round(s.score * 100)}% Match</div>
                    <button className="select-time-btn">Propose</button>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <p>No suggestions yet. Sync calendars to see optimal times.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Availability;
