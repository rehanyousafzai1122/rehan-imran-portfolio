// Firebase initialization — Firestore (database) + Storage (uploaded photos/video).
//
// This is what lets the admin panel write to ONE shared cloud database instead of
// each browser's own localStorage. Every visitor's browser reads the same document,
// so an update made from the admin panel shows up everywhere, on any device.
//
// Setup (one-time, do this yourself in the Firebase Console):
//   1. https://console.firebase.google.com -> Add project (e.g. "rehan-portfolio")
//   2. Build > Firestore Database -> Create database -> Start in production mode
//   3. Build > Storage -> Get started (for uploaded photos/video files)
//   4. Project settings (gear icon) > General > "Your apps" > Add app > Web (</>)
//      Copy the firebaseConfig values into your .env file (see .env.example)
//   5. Firestore Rules & Storage Rules: see firestore.rules / storage.rules in this
//      repo for the recommended starting rules, and paste them into the console.

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { getAuth, type Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Whether real Firebase credentials are present. When they're not (e.g. running
// locally before you've set up a project), the app falls back to localStorage-only
// mode automatically instead of crashing — see PortfolioContext.tsx.
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
);

let app: FirebaseApp | null = null;
let firestoreDb: Firestore | null = null;
let storageInstance: FirebaseStorage | null = null;
let authInstance: Auth | null = null;

if (isFirebaseConfigured) {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  firestoreDb = getFirestore(app);
  storageInstance = getStorage(app);
  authInstance = getAuth(app);
}

export const db = firestoreDb;
export const storage = storageInstance;
export const auth = authInstance;
