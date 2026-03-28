export interface EventSlot {
  start: string;
  end: string;
  isBusy: boolean;
}

export interface Suggestion {
  start: string;
  score: number; // 0 to 1
}

/**
 * FULL IMPLEMENTATION of the Weighted Multi-User Availability Algorithm
 * 1. Divide next 7 days into 30-min slots
 * 2. Mark slots as busy/free for all users
 * 3. Apply family-specific scoring weights
 */
export const findOptimalEventTimes = (
  allUsersEvents: any[][], 
  durationMinutes: number = 60
): Suggestion[] => {
  const suggestions: Suggestion[] = [];
  const now = new Date();
  const searchStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0); // Start at 9 AM today
  const searchEnd = new Date(searchStart.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days window

  // Helper to check if a specific 30-min slot is free for all users
  const isSlotViable = (slotStart: Date, slotEnd: Date): number => {
    let freeCount = 0;
    const totalUsers = allUsersEvents.length || 1; // Default to 1 if no users synced yet

    allUsersEvents.forEach(userEvents => {
      const isBusy = userEvents.some(event => {
        const eventStart = new Date(event.start.dateTime);
        const eventEnd = new Date(event.end.dateTime);
        return (slotStart < eventEnd && slotEnd > eventStart);
      });
      if (!isBusy) freeCount++;
    });

    return freeCount / totalUsers;
  };

  // Iterate through every 30-min slot in the next 7 days
  for (let time = searchStart.getTime(); time < searchEnd.getTime(); time += 30 * 60 * 1000) {
    const slotStart = new Date(time);
    const slotEnd = new Date(time + durationMinutes * 60 * 1000);

    // Skip late nights (11 PM to 8 AM)
    const hour = slotStart.getHours();
    if (hour >= 23 || hour < 8) continue;

    let baseScore = isSlotViable(slotStart, slotEnd);
    
    if (baseScore > 0) {
      // WEIGHTING SYSTEM:
      
      // 1. Social Hour Bonus (17:00 - 20:00)
      if (hour >= 17 && hour <= 20) baseScore += 0.1;
      
      // 2. Weekend Bonus
      const day = slotStart.getDay();
      if (day === 0 || day === 6) baseScore += 0.15;

      // 3. Early Morning Penalty (8 AM - 10 AM)
      if (hour < 10) baseScore -= 0.1;

      suggestions.push({
        start: slotStart.toISOString(),
        score: Math.min(Math.max(baseScore, 0), 1) // Clamp between 0 and 1
      });
    }
  }

  // Sort by highest score and return top 5
  return suggestions
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
};
