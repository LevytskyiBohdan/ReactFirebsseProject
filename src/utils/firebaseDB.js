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

export function getCollectionWithQuery(collection, query) {
    return new Promise((resolve, reject) => {
        db.collection(collection).where(query.name, query.symbol, query.equal)
            .get()
            .then(function (querySnapshot) {
                if (querySnapshot.docs.length !== 0) {

                    querySnapshot.forEach(function (doc) {
                        let data = [];
                        querySnapshot.forEach((doc) => {
                            data.push(Object.assign({}, { id: doc.id }, doc.data()));
                        });

                        return resolve(data)
                    });
                }
                return resolve([]);
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
                if (doc.data()) {
                    return resolve(doc.data());
                } else {
                    return resolve({})
                }
            }).catch(function (error) {
                return reject("Error getting document:", error)
            });
    })

}

export function editById(collection, id, data) {
    return new Promise((resolve, reject) => {

        db.collection(collection).doc(id).set(data, { merge: true })
            .then(function () {
                return resolve();
            })
            .catch(function (error) {
                return reject(error);
            });
    })
}

export function deleteById(collection, id) {
    return new Promise((resolve, reject) => {
        db.collection(collection).doc(id).delete().then(function () {
            return resolve();

        }).catch(function (error) {
            return reject(error);

        });
    })
}

export function createDocument(collection, date) {
    return new Promise((resolve, reject) => {
        
        db.collection(collection).add(date)
            .then(function () {
                return resolve();
            })
            .catch(function (error) {
                return reject(error);
            });
    })
}

export function createDocumentWithId(collection, id, data) {
    return new Promise((resolve, reject) => {

        db.collection(collection).doc(id).set(data)
        .then(function() {
            return resolve();
        })
        .catch(function(error) {
            return reject(error);
        });
    })
}
