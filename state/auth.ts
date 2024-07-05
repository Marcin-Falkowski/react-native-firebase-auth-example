import { IRegisterForm, IAuthState } from "@/constants/Interfaces";
import { auth, db } from "@/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { create } from "zustand";

const useAuth = create<IAuthState>((set, get) => ({
  isAuthenitcated: false,
  user: {},
  signIn: async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response.user) {
        return { success: true, data: response.user };
      }
    } catch (error) {
      if (error instanceof Error) {
        set({ isAuthenitcated: false });
        return { success: false, data: error.message };
      }
    }

    set({ isAuthenitcated: true });
  },
  signOut: async () => {
    await signOut(auth);
    set({ isAuthenitcated: false });
  },

  signUp: async ({
    email,
    password,
    username,
  }: Omit<IRegisterForm, "repeatPassword">) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (response.user) {
        await setDoc(doc(db, "users", response.user.uid), {
          username,
          userId: response.user.uid,
        });
        return { success: true, data: response.user };
      }
    } catch (error) {
      if (error instanceof Error) {
        set({ isAuthenitcated: false });
        return { success: false, data: error.message };
      }
    }
  },
  loginAction: () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/(tabs)");
        set({ isAuthenitcated: true, user });
      } else {
        router.replace("/log-in");
        set({ isAuthenitcated: false, user: {} });
      }
    });
  },
}));

export default useAuth;
