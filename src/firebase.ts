// lib/firebase.ts
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  signInWithPopup, 
  signOut, 
  fetchSignInMethodsForEmail, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  confirmPasswordReset, 
  verifyPasswordResetCode,
  Auth,
  UserCredential
} from 'firebase/auth';
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL,
  FirebaseStorage
} from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase services
let app: FirebaseApp;
let auth: Auth;
let storage: FirebaseStorage;
let googleProvider: GoogleAuthProvider;
let facebookProvider: FacebookAuthProvider;
let isFirebaseInitialized = false;

// Initialize only once
if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    storage = getStorage(app);
    googleProvider = new GoogleAuthProvider();
    facebookProvider = new FacebookAuthProvider();
    isFirebaseInitialized = true;
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
} else {
  app = getApps()[0];
  auth = getAuth(app);
  storage = getStorage(app);
  googleProvider = new GoogleAuthProvider();
  facebookProvider = new FacebookAuthProvider();
  isFirebaseInitialized = true;
}

// Google sign-in function
const signInWithGoogle = async (): Promise<UserCredential | void> => {
  if (!auth || !googleProvider) {
    console.warn("Firebase auth not initialized or Google provider unavailable");
    return;
  }

  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

// Facebook sign-in function
const signInWithFacebook = async (): Promise<UserCredential | void> => {
  if (!auth || !facebookProvider) {
    console.warn("Firebase auth not initialized or Facebook provider unavailable");
    return;
  }

  try {
    return await signInWithPopup(auth, facebookProvider);
  } catch (error) {
    console.error("Error signing in with Facebook", error);
    throw error;
  }
};

// Logout function
const logout = async (): Promise<void> => {
  if (!auth) {
    console.warn("Firebase auth not initialized");
    return;
  }
  
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out", error);
    throw error;
  }
};

// Upload file and get download URL (generic function)
const uploadFileAndGetURL = async (file: File, path: string): Promise<string> => {
  try {
    const fileRef = ref(storage, `${path}/${file.name}`);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

// Password reset email function
const sendPasswordReset = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};

// Verify password reset code function
const verifyPasswordReset = async (code: string): Promise<string> => {
  try {
    return await verifyPasswordResetCode(auth, code);
  } catch (error) {
    console.error("Invalid or expired password reset code:", error);
    throw error;
  }
};

// Reset password function
const resetPassword = async (code: string, newPassword: string): Promise<void> => {
  try {
    await confirmPasswordReset(auth, code, newPassword);
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

// Export Firebase functionalities
export {
  auth, 
  storage, 
  signInWithGoogle, 
  signInWithFacebook, 
  logout, 
  isFirebaseInitialized, 
  fetchSignInMethodsForEmail, 
  signInWithEmailAndPassword, 
  uploadFileAndGetURL,
  sendPasswordReset,
  verifyPasswordReset,
  resetPassword
};
