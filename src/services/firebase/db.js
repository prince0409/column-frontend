import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  projectId: "demo-column-frontend-exercise",
};

let db;

try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
  console.log("Firebase Firestore connected successfully!");
} catch (error) {
  console.error("Error connecting to Firebase Firestore:", error.message);
}
export { db };
