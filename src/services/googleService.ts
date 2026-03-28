import { googleConfig } from "../config/authConfig";

let googleAccessToken: string | null = null;

export const loginGoogle = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    const google = window.google;
    if (!google) return reject("Google Identity Services script not loaded.");

    const client = google.accounts.oauth2.initTokenClient({
      client_id: googleConfig.clientId,
      scope: googleConfig.scopes,
      callback: (response: any) => {
        if (response.error_description) {
          reject(response.error_description);
        } else {
          googleAccessToken = response.access_token;
          console.log("Google Access Token Acquired");
          resolve(response.access_token);
        }
      },
    });

    client.requestAccessToken();
  });
};

export const getGoogleCalendarEvents = async (start: string, end: string) => {
  if (!googleAccessToken) throw new Error("No Google access token found. Please login first.");

  // We use fetch instead of gapi.client for a cleaner modern flow
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${start}&timeMax=${end}&singleEvents=true&orderBy=startTime`,
    {
      headers: {
        Authorization: `Bearer ${googleAccessToken}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || "Failed to fetch Google events");
  }

  const data = await response.json();
  console.log("Google Events Found:", data.items?.length || 0);

  return (data.items || []).map((event: any) => ({
    id: event.id,
    subject: event.summary || "(No Title)",
    start: { dateTime: event.start.dateTime || event.start.date },
    end: { dateTime: event.end.dateTime || event.end.date },
  }));
};
