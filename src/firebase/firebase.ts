
import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBm1TLQGWKdkoieUw0_1L-JYU-W2DmLSJU",
  authDomain: "next-chat-2c21e.firebaseapp.com",
  projectId: "next-chat-2c21e",
  storageBucket: "next-chat-2c21e.appspot.com",
  messagingSenderId: "909144559033",
  appId: "1:909144559033:web:45e723556570e155837a68",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const messageRef = collection(db, "messages");

export { auth, db, storage, messageRef };
