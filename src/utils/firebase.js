import * as firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBivmREHCYLY5UQd70Nn2iLE1ilUL2OQ7Q",
    authDomain: "react-firebase-project-f71c4.firebaseapp.com",
    databaseURL: "https://react-firebase-project-f71c4.firebaseio.com",
    projectId: "react-firebase-project-f71c4",
    storageBucket: "react-firebase-project-f71c4.appspot.com",
    messagingSenderId: "860315756739",
    appId: "1:860315756739:web:a04429374fdcdbe6505a76",
    measurementId: "G-H0SWCSLBKX"
};

firebase.initializeApp(firebaseConfig);
// firebase.firestore().settings({ timestampsInSnapshots: true})

export const db = firebase.firestore();
export const storage = firebase.storage();

export default firebase;