/* eslint-disable promise/no-nesting */
/* eslint-disable promise/always-return */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");


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

firebase.initializeApp(firebaseConfig);

const auth = admin.auth();
const db = firebase.firestore();

/*
 * Gets all the users (1000 MAX) from Firebase auth.
 *
 * @param {Object} req Express Request Object.
 * @param {Object} res Express Response Object
 */
const getAllUsers = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

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

const changePostsAutor = (req, res) => {
  res.set('Access-Control-Allow-Headers', 'X-Custom-Header, Upgrade-Insecure-Requests, Accept, Content-Type');
  res.set('Access-Control-Allow-Origin', '*');

  new Promise((resolve, reject) => {
    db.collection('posts').where('owner', '==', req.body.owner)
      .get()
      .then((querySnapshot) => {

        if (querySnapshot.docs.length !== 0) {

          querySnapshot.forEach((doc) => {
            let data = [];
            querySnapshot.forEach((doc) => {
              data.push(doc.id);
            });

            return resolve(data)
          });
        } else return resolve([]);
      })
      .catch((error) => {
        return reject(error)
      });

  }).then(data => {
    if(data.length === 0) throw new Error("No posts yet")

    data.forEach((post, idx) => {
      db.collection('posts').doc(post).set({
        author: req.body.newName,
      }, { merge: true })
        .then(() => {
          if ((data.length - 1) === idx) res.send("all ok, >>>>")
        })
        .catch((error) => {
          res.send(error)
        });

    })
  })
    .catch(err => { 
      console.log(err)
      res.send(String(err))
    });
}


const test = (req, res) => {
  res.set('Access-Control-Allow-Headers', 'X-Custom-Header, Upgrade-Insecure-Requests, Accept, Content-Type');
  res.set('Access-Control-Allow-Origin', '*');

  res.send(req.body)
}


module.exports = {
  api: functions.https.onRequest(getAllUsers),
  changePostsAutor: functions.https.onRequest(changePostsAutor),
  test: functions.https.onRequest(test),
};

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
