import firebase from "./firebase";
import {
    USER_LOGOUT_SUCCESS,
    GET_USER_FAILURE,
    DELETE_USER_SUCCESS,
} from '../constants';

export function firebaseGetCurrentUser() {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                return resolve(user);
            } else {
                return reject(GET_USER_FAILURE);
            }
        });
    })
}

export function firebaseCreateUser(userData) {
    return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password).then(user => {
            delete userData.email;
            delete userData.password;

            resolve(firebaseEditUser(userData));
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            reject((errorCode || errorMessage) ? { errorCode, errorMessage } : error);
        });
    })
}

export function firebaseEditUser(userData) {
    return new Promise((resolve, reject) => {
        var user = firebase.auth().currentUser;
        user.updateProfile(userData).then(function () {
            return firebaseGetCurrentUser().then(res => resolve(res)).catch(err => reject(err))
        }).catch(function (error) {
            return reject(error);
        });
    })
}

export function firebaseAuth(user) {
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(() => {
            return firebaseGetCurrentUser().then(res => resolve(res).catch(err => reject(err)))
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            return reject((errorCode || errorMessage) ? { errorCode, errorMessage } : error)
        });
    })
}

export function firebaseAuthLogout(user) {
    return new Promise((resolve, reject) => {
        return firebase.auth().signOut().then(function () {
            return resolve(USER_LOGOUT_SUCCESS);
        }).catch(function (error) {
            return reject(error);
        });
    })
}

export function firebaseDeleteUser(user) {
    return new Promise((resolve, reject) => {
        var user = firebase.auth().currentUser;
        user.delete().then(function () {
            return resolve(DELETE_USER_SUCCESS);
        }).catch(function (error) {
            return reject(error);
        });
    })
}