import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
// import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCnwgU9yBqeL8VneWkJuQmALeZ09kZW4iQ',
  authDomain: 'react-native-app-20290.firebaseapp.com',
  projectId: 'react-native-app-20290',
  storageBucket: 'react-native-app-20290.appspot.com',
  messagingSenderId: '7425096629',
  appId: '1:7425096629:web:37976c678d2735fec7f7fc',
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
export default firebase.initializeApp(firebaseConfig);
