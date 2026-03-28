import { doc, setDoc, collection, query, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export interface UserSchedule {
  userId: string;
  userName: string;
  provider: 'Google' | 'Outlook';
  events: any[];
  updatedAt: string;
}

/**
 * UPLOADS a user's calendar events to the shared family database.
 */
export const uploadSchedule = async (schedule: UserSchedule) => {
  if (!db || !db.app) {
    console.warn("Firestore not initialized. Skipping upload.");
    return;
  }

  try {
    const userDocRef = doc(db, "schedules", schedule.userId);
    await setDoc(userDocRef, {
      ...schedule,
      updatedAt: new Date().toISOString()
    });
    console.log("Schedule successfully uploaded to Firebase.");
  } catch (error) {
    console.error("Error uploading schedule:", error);
    throw error;
  }
};

/**
 * FETCHES all family schedules currently stored in the database.
 */
export const getFamilySchedules = async (): Promise<UserSchedule[]> => {
  if (!db || !db.app) {
    console.warn("Firestore not initialized. Returning empty family list.");
    return [];
  }

  try {
    const schedulesRef = collection(db, "schedules");
    const q = query(schedulesRef);
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => doc.data() as UserSchedule);
  } catch (error) {
    console.error("Error fetching family schedules:", error);
    return [];
  }
};
