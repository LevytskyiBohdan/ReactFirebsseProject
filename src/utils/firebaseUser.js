import firebase from "./firebase";

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

export function firebaseCreateUser(email, password) {
    return new Promise((resolve, reject) => {
        console.log(email.trim(), password)
        firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
            
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

export function firebaseAuth(email, password) {
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            
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

export function firebaseDeleteUser(email, password) {
    return new Promise((resolve, reject) => {
        firebaseAuth(email, password).then(() => {
            const user = firebase.auth().currentUser;
                user.delete().then(function () {
                    return resolve();
                }).catch(function (error) {
                    return reject(error);
                })
        })
        .catch(err => {
            return reject(err);
        })
    })
}
