import React, { useState, useEffect } from 'react';
import { login, getCalendarEvents, suggestOptimalTimes } from '../services/outlookService';
import { loginGoogle, getGoogleCalendarEvents } from '../services/googleService';
import { uploadSchedule, getFamilySchedules, type UserSchedule } from '../services/dbService';
import './Availability.css';

const Availability: React.FC = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [familySchedules, setFamilySchedules] = useState<UserSchedule[]>([]);
  const [suggestions, setSuggestions] = useState<{ start: string; score: number }[]>([]);
  const [account, setAccount] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Load existing family data on mount
  useEffect(() => {
    refreshFamilyData();
  }, []);

  const refreshFamilyData = async () => {
    const schedules = await getFamilySchedules();
    setFamilySchedules(schedules);
    if (schedules.length > 0) {
      const allEvents = schedules.map(s => s.events);
      setSuggestions(suggestOptimalTimes(allEvents, 60));
    }
  };

  const handleSyncOutlook = async () => {
    setIsSyncing(true);
    setError(null);
    try {
      const userAccount = await login();
      if (userAccount) {
        setAccount({ name: userAccount.username, type: 'Outlook' });
        const start = new Date().toISOString();
        const end = new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString();
        const fetchedEvents = await getCalendarEvents(start, end);
        
        // UPLOAD TO DATABASE
        await uploadSchedule({
          userId: userAccount.localAccountId,
          userName: userAccount.username,
          provider: 'Outlook',
          events: fetchedEvents,
          updatedAt: new Date().toISOString()
        });

        await refreshFamilyData();
      }
    } catch (err: any) {
      setError(err.message || "Outlook Sync failed");
    } finally { setIsSyncing(false); }
  };

  const handleSyncGoogle = async () => {
    setIsSyncing(true);
    setError(null);
    try {
      const { token, email } = await loginGoogle();
      if (token) {
        setAccount({ name: email, type: 'Google' });
        const start = new Date().toISOString();
        const end = new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString();
        const fetchedEvents = await getGoogleCalendarEvents(start, end);
        
        // UPLOAD TO DATABASE - uses email as stable ID
        await uploadSchedule({
          userId: "google_" + email.replace(/[.@]/g, '_'), 
          userName: email.split('@')[0],
          provider: 'Google',
          events: fetchedEvents,
          updatedAt: new Date().toISOString()
        });

        await refreshFamilyData();
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
        <p>Sync your calendar to share your availability with the whole family.</p>
      </header>

      {error && <div className="error-banner">⚠️ {error}</div>}

      <div className="availability-container">
        <section className="sync-section">
          <div className="card">
            <h2>Your Connection</h2>
            {account ? (
              <div className="status-connected">
                <span className="user-email">Connected via {account.type}</span>
                <p>Your schedule is now synced with the family.</p>
              </div>
            ) : (
              <p>Connect your calendar to find the best time for everyone.</p>
            )}
            
            <div className="sync-actions">
              <button className="sync-btn outlook" onClick={handleSyncOutlook} disabled={isSyncing}>
                {isSyncing ? 'Syncing...' : 'Sync Outlook'}
              </button>
              <button className="sync-btn google" onClick={handleSyncGoogle} disabled={isSyncing}>
                {isSyncing ? 'Syncing...' : 'Sync Google'}
              </button>
            </div>
          </div>

          <div className="card family-status" style={{ marginTop: '20px' }}>
            <h3>Family Sync Status</h3>
            <div className="family-members-list">
              {familySchedules.map(s => (
                <div key={s.userId} className="family-member-item">
                  <span className="dot online"></span> {s.userName} ({s.provider})
                </div>
              ))}
              {familySchedules.length === 0 && <p>No family members synced yet.</p>}
            </div>
          </div>
        </section>

        <section className="suggestions-section">
          <div className="card">
            <h2>Optimal Family Times</h2>
            <p className="subtitle">Based on {familySchedules.length} synced members</p>
            
            <div className="suggestions-list">
              {suggestions.length > 0 ? (
                suggestions.map((s, i) => (
                  <div key={i} className="suggestion-card">
                    <div className="time-info">
                      <span className="day">{new Date(s.start).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })}</span>
                      <span className="time">{new Date(s.start).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="score-badge">{Math.round(s.score * 100)}% Free</div>
                    <button className="select-time-btn">Propose</button>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <p>Sync your calendar to see suggestions!</p>
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
