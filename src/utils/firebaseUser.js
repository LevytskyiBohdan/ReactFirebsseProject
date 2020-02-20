import firebase from "./firebase";
import {
    USER_LOGOUT_SUCCESS,
} from '../constants';

export function firebaseGetCurrentUser() {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                return resolve(user);
            } else {
                return reject();
            }
        });
    })
}

export function firebaseCreateUser(data) {
    return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then(user => {
            
            return resolve(user);
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            return reject((errorCode || errorMessage) ? { errorCode, errorMessage } : error);
        });
    })
}

export function firebaseEditUser(userData) {
    return new Promise((resolve, reject) => {
        var user = firebase.auth().currentUser;

        user.updateProfile(userData).then(function () {
            return resolve();

        })
        .catch(function (error) {
            
            return reject(error);
        });
    })
}

export function firebaseAuth(user) {
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(() => {
            
            return resolve();
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            
            return reject((errorCode || errorMessage) ? { errorCode, errorMessage } : error)
        });
    })
}

export function firebaseAuthLogout() {
    return new Promise((resolve, reject) => {
        return firebase.auth().signOut().then(function () {
            return resolve();
        }).catch(function (error) {
            return reject(error);
        });
    })
}

export function firebaseDeleteUser(data) {
    return new Promise((resolve, reject) => {
        return firebaseAuth(data).then(() => {
            const user = firebase.auth().currentUser;
            return resolve(
                user.delete().then(function () {
                    return resolve();
                }).catch(function (error) {
                    return reject(error);
                })
            );
        })
        .catch(err => {
            return reject(err);
        })
    })
}