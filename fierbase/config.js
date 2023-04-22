import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
// import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB1f9ITSkoRjg5i9FzXaUSelvtix26kQ10',
  authDomain: 'react-native-728d6.firebaseapp.com',
  databaseURL: 'https://react-native-728d6-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'react-native-728d6',
  storageBucket: 'react-native-728d6.appspot.com',
  messagingSenderId: '736268165665',
  appId: '1:736268165665:web:fd307faaac2e43a453f960',
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
export default firebase.initializeApp(firebaseConfig);
