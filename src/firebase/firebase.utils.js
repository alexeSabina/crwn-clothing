import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyAej-JNH4scbyekm_iN5kn6yI9cOhUskoQ",
    authDomain: "crwn-db-77937.firebaseapp.com",
    projectId: "crwn-db-77937",
    storageBucket: "crwn-db-77937.appspot.com",
    messagingSenderId: "39158878967",
    appId: "1:39158878967:web:7e7a4c8a857269622779f2",
    measurementId: "G-9YGQ3Z5RJ1"
};
 
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// code for google authentication
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;