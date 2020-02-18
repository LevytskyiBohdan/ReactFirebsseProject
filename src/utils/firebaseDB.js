import { db } from "./firebase";

import { LIKE_COUNT_SUCCESS } from "../constants";

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

export function getCollectionWithQuery(collection, query) {
    return new Promise((resolve, reject) => {
        db.collection(collection).where(query.name, query.symbol, query.equal)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    let data = [];
                    querySnapshot.forEach((doc) => {
                        data.push(Object.assign({}, { id: doc.id }, doc.data()));
                    });
                    return resolve(data)
                });
            })
            .catch(function (error) {
                return reject(error)
            });
    })
}

export function getById(collection, id) {
    return new Promise((resolve, reject) => {
        db.collection(collection).doc(id)
            .get().then(function (doc) {
                if (doc) {
                    return resolve(doc.data());
                } else {
                    return reject("No such document!")
                }
            }).catch(function (error) {
                return reject("Error getting document:", error)
            });
    })

}

export function editById(data) {
    return new Promise((resolve, reject) => {
        const collection = data.collection;
        const id = data.id;

        delete data.collection;
        delete data.id;
        getById(collection, id).then(res => {
            console.log(Object.assign({}, res, data))
            // return null;
            return db.collection(collection).doc(id).set(
                Object.assign({}, res, data)
            )
                .then(function () {
                    return resolve(getCollection(collection));
                })
                .catch(function (error) {
                    return reject(error);
                })
        })
    })
}

export function deleteById(data) {
    return new Promise((resolve, reject) => {
        db.collection(data.collection).doc(data.id).delete().then(function () {
            return resolve(getCollection(data.collection));

        }).catch(function (error) {
            return reject(error);

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
