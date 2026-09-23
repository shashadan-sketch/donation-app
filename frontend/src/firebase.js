import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOxk4Q7y802I2AyKiUW5SHLTvr-aN76kQ",
  authDomain: "donation-live-app.firebaseapp.com",
  projectId: "donation-live-app",
  storageBucket: "donation-live-app.firebasestorage.app",
  messagingSenderId: "516636933902",
  appId: "1:516636933902:web:18269d8e54af1aee7f615f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);