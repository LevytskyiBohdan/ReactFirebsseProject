import { db } from "./firebase";


export function getCollection(collection) {
    return new Promise((resolve, reject) => {
        db.collection(collection).get().then((querySnapshot) => {
            let data = [];
            querySnapshot.forEach((doc) => {
                data.push(Object.assign({}, { id: doc.id }, doc.data()));
            });
            resolve(data)
        })
            .catch(err => reject(err));
    })
}

export function getById(collection, id) {
    return new Promise((resolve, reject) => {
        db.collection(collection).doc(id)
            .get().then(function (doc) {
                if (doc) {
                    resolve(doc.data());
                } else {
                    console.log("No such document!")
                }
            }).catch(function (error) {
                console.log("Error getting document:", error)
            });
    })

}

export function createDocument(date) {
    return new Promise((resolve, reject) => {
        const collection = date.collection;
        delete date.collection;
        db.collection(collection).add(date)
            .then(function () {
                return resolve(getCollection(collection));
            })
            .catch(function (error) {
                return reject(error);
            });
    })
}
