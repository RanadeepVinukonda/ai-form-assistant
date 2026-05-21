import { initializeApp } from "@firebase/app"
import { getAuth, GoogleAuthProvider } from "@firebase/auth"
import { getFirestore } from "@firebase/firestore"
import { getStorage } from "@firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDsjECzDqRx0lMqv2leMNH3lHp7glN5mVA",
  authDomain: "aiformassitant.firebaseapp.com",
  projectId: "aiformassitant",
  storageBucket: "aiformassitant.firebasestorage.app",
  messagingSenderId: "874744096762",
  appId: "1:874744096762:web:a60d8b6725fc6509762643",
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const googleProvider = new GoogleAuthProvider()
