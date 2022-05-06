import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const shouldConnectEmulator = () => {
  return process.env.NODE_ENV === "development";
};

export const app = initializeApp(clientCredentials);

// DB and emulators
export const db = getFirestore();
if (shouldConnectEmulator()) {
  // https://firebase.google.com/docs/emulator-suite/connect_firestore
  connectFirestoreEmulator(db, "localhost", 8080);
}

// AUTH and EMULATORS
export const clientAuth = getAuth(app);

if (shouldConnectEmulator()) {
  connectAuthEmulator(getAuth(), "http://localhost:9099");
}
