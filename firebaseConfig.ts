// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASdIJ_AAsKZ0FFQGWMq7uFePFN5RGQ9jg",
  authDomain: "fir-auth-example-3566d.firebaseapp.com",
  projectId: "fir-auth-example-3566d",
  storageBucket: "fir-auth-example-3566d.appspot.com",
  messagingSenderId: "341502392630",
  appId: "1:341502392630:web:7e0c6689cbcd731017db97",
  measurementId: "G-36L5GY0MWY",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const usersFromDataBase = collection(db, "users");
