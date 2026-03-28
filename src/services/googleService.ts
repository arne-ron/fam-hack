import { googleConfig } from "../config/authConfig";

let googleAccessToken: string | null = null;
let googleUserEmail: string | null = null;

export const loginGoogle = (): Promise<{ token: string, email: string }> => {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    const google = window.google;
    if (!google) return reject("Google Identity Services script not loaded.");

    const client = google.accounts.oauth2.initTokenClient({
      client_id: googleConfig.clientId,
      scope: googleConfig.scopes,
      callback: async (response: any) => {
        if (response.error_description) {
          reject(response.error_description);
        } else {
          googleAccessToken = response.access_token;
          
          // Fetch user info to get the email (used as unique ID)
          try {
            const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
              headers: { Authorization: `Bearer ${googleAccessToken}` }
            });
            const userInfo = await userInfoResponse.json();
            console.log("Full User Info:", userInfo);
            googleUserEmail = userInfo.email;
            
            console.log("Google Account Connected:", googleUserEmail);
            resolve({ token: response.access_token, email: userInfo.email });
          } catch (err) {
            reject("Failed to fetch user email");
          }
        }
      },
    });

    client.requestAccessToken();
  });
};

export const getGoogleCalendarEvents = async (start: string, end: string) => {
  if (!googleAccessToken) throw new Error("No Google access token found. Please login first.");

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
  console.log("Google Events Found:", data.items?.length || 0, "(redacted)");

  return (data.items || []).map((event: any) => ({
    id: event.id,
    subject: "Busy", // Redact subject
    start: { dateTime: event.start.dateTime || event.start.date },
    end: { dateTime: event.end.dateTime || event.end.date },
  }));
};
