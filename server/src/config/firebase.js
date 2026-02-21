import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

// Initialize Firebase Admin with service account or credentials from env
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : null

if (serviceAccount) {
  initializeApp({ credential: cert(serviceAccount) })
}

export const db = getFirestore()
