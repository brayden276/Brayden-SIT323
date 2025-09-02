import {
  initializeApp
} from 'firebase/app';
import {
  getFirestore
} from 'firebase/firestore';

// read + trim env vars (helps catch accidental trailing spaces)
const apiKey = (
  import.meta.env.VITE_FIREBASE_API_KEY || '').trim();
const authDomain = (
  import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '').trim();
const projectId = (
  import.meta.env.VITE_FIREBASE_PROJECT_ID || '').trim();
const storageBucket = (
  import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '').trim();
const messagingSenderId = (
  import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '').trim();
const appId = (
  import.meta.env.VITE_FIREBASE_APP_ID || '').trim();

let firebaseConfigured = true;
if (!apiKey || !authDomain || !projectId || !appId) {
  console.warn('Firebase not configured. Please create a .env.local with VITE_FIREBASE_* values.');
  firebaseConfigured = false;
}

// Log the effective env (mask API key) to help debug missing values
console.log('FIREBASE ENV', {
  apiKey: apiKey ? `${apiKey.slice(0, 8)}...${apiKey.slice(-4)}` : apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  firebaseConfigured
});

let app = null;
let db = null;

if (firebaseConfigured) {
  const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId
  };
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} else {
  // Provide a clearer console error instead of failing silently
  console.error('Firebase initialization skipped because required VITE_* env vars are missing or empty. Ensure .env(.local) is present, values are prefixed with VITE_, and restart the dev server.');
}

export {
  db,
  firebaseConfigured
};