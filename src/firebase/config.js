import firebase from "firebase"
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAqEtxB0-OwB7gyXDFwXV6UGNWmCJlEDuE",
  authDomain: "bright-community-d.firebaseapp.com",
  projectId: "bright-community-d",
  storageBucket: "bright-community-d.appspot.com",
  messagingSenderId: "114699956000",
  appId: "1:114699956000:web:b240292709d67b4aaef145"
};

  // Init Firebase
  firebase.initializeApp(firebaseConfig)

  // Init Services
  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()
  const projectStorage = firebase.storage()

  // Timestamp
  const timestamp = firebase.firestore.Timestamp

  export {projectFirestore, projectAuth, timestamp, projectStorage}
