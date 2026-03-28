import { PublicClientApplication, InteractionRequiredAuthError, type IPublicClientApplication } from "@azure/msal-browser";
import { Client } from "@microsoft/microsoft-graph-client";
import { msalConfig, loginRequest } from "../config/authConfig";
import { findOptimalEventTimes } from "./suggestionAlgorithm";

let msalInstance: IPublicClientApplication | null = null;
let initPromise: Promise<void> | null = null;

export interface CalendarEvent {
  id: string;
  subject: string;
  start: { dateTime: string; timeZone: string };
  end: { dateTime: string; timeZone: string };
  isAllDay: boolean;
}

const getMsalInstance = async (): Promise<IPublicClientApplication> => {
  if (msalInstance) return msalInstance;
  
  if (!initPromise) {
    console.log("Creating and initializing MSAL instance...");
    const pca = new PublicClientApplication(msalConfig);
    initPromise = pca.initialize().then(() => {
      msalInstance = pca;
      console.log("MSAL Initialized successfully.");
    });
  }
  
  await initPromise;
  return msalInstance!;
};

export const login = async () => {
  console.log("Starting login flow...");
  try {
    const pca = await getMsalInstance();
    
    // Check if we already have an active account in memory
    const accounts = pca.getAllAccounts();
    if (accounts.length > 0) {
      console.log("Active account found:", accounts[0].username);
      pca.setActiveAccount(accounts[0]);
      return accounts[0];
    }

    console.log("No active account, launching popup...");
    const loginResponse = await pca.loginPopup({
      ...loginRequest,
      prompt: "select_account"
    });
    
    pca.setActiveAccount(loginResponse.account);
    console.log("Login success:", loginResponse.account.username);
    return loginResponse.account;
  } catch (err: any) {
    if (err.errorCode === "interaction_in_progress") {
      console.warn("Interaction already in progress. Please check for open popups.");
      const pca = await getMsalInstance();
      const accounts = pca.getAllAccounts();
      if (accounts.length > 0) return accounts[0];
    }
    
    console.error("Login failed detailed: ", err);
    throw err;
  }
};

export const getAccessToken = async () => {
  const pca = await getMsalInstance();
  const accounts = pca.getAllAccounts();
  
  if (accounts.length > 0) {
    try {
      const response = await pca.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      });
      return response.accessToken;
    } catch (err) {
      if (err instanceof InteractionRequiredAuthError) {
        console.log("Silent token acquisition failed, trying popup...");
        const response = await pca.acquireTokenPopup(loginRequest);
        return response.accessToken;
      }
      console.error("Token acquisition failed: ", err);
    }
  }
  return null;
};

export const getCalendarEvents = async (start: string, end: string): Promise<CalendarEvent[]> => {
  console.log(`Fetching calendar from ${start} to ${end}`);
  const token = await getAccessToken();
  if (!token) throw new Error("Could not obtain access token");

  const client = Client.init({
    authProvider: (done) => {
      done(null, token);
    },
  });

  try {
    const response = await client
      .api("/me/calendarView")
      .query({
        startDateTime: start,
        endDateTime: end,
      })
      .select("id,subject,start,end,isAllDay")
      .get();

    console.log(`Successfully fetched ${response.value.length} events`);
    return response.value;
  } catch (err) {
    console.error("Graph API Error: ", err);
    return [];
  }
};

// Re-exporting the algorithm for consistency
export const suggestOptimalTimes = findOptimalEventTimes;
