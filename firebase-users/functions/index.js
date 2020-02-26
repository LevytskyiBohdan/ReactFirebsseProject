/* eslint-disable promise/always-return */
const functions = require('firebase-functions');
const admin = require('firebase-admin');

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

admin.initializeApp(firebaseConfig);

const auth = admin.auth();

/*
 * Gets all the users (1000 MAX) from Firebase auth.
 *
 * @param {Object} req Express Request Object.
 * @param {Object} res Express Response Object
 */
const getAllUsers = (req, res) => {
  const maxResults = 1; // optional arg.
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');

  auth.listUsers().then((userRecords) => {
    let users = [];

    userRecords.users.forEach((user) => {
        users.push(user.toJSON())
    });
    res.send(users);
  }).catch((error) => { 
      console.log(error)
      res.send(error);
    });
};

module.exports = {
  api: functions.https.onRequest(getAllUsers),
};

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
