// This import loads the firebase namespace along with all its type information.
import firebase from 'firebase/app';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-SwGLrxDmmdmMYL-uLVTCx7_Axo3CVnY",
  authDomain: "wirus-demo-platform.firebaseapp.com",
  projectId: "wirus-demo-platform"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;