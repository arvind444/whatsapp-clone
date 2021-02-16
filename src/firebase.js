import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEQxigbe1Hi74I2-SpLqU6QPYph5t_43I",
  authDomain: "whatsapp-clone-spak-c7623.firebaseapp.com",
  projectId: "whatsapp-clone-spak-c7623",
  storageBucket: "whatsapp-clone-spak-c7623.appspot.com",
  messagingSenderId: "944370962932",
  appId: "1:944370962932:web:c3806f39a2d1f9507929a1",
  measurementId: "G-FZTGY0XYFR"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;