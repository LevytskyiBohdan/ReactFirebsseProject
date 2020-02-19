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

// export function setNewUserNameInPosts(data) {
//     return new Promise((resolve, reject) => {
//         return getCollection.then(allPosts => {
//             const userPostsId = allPosts.filter(post => {
//                 if (post.userUid === data.userUid) {
//                     return post.id;
//                 }
//             })
//             console.log(userPostsId)
//             // return resolve(
//             //     userPostsId.forEach(id => {
//             //         getById(data.collection, id).then(res => {
//             //             return db.collection(data.collection).doc(id).set(
//             //                 Object.assign({}, res, { author: data.newName })
//             //             )
//             //                 .then(function () {
//             //                     return resolve();
//             //                 })
//             //                 .catch(function (error) {
//             //                     return reject(error);
//             //                 })
//             //         })
//             //     })
//             // )


//         })
//     })
// }
// // newName
// // userUid
// // collection



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
        const query = data.query;

        delete data.collection;
        delete data.id;
        delete data.query;
        getById(collection, id).then(res => {
            return db.collection(collection).doc(id).set(
                Object.assign({}, res, data)
            )
                .then(function () {
                    return resolve(getCollectionWithQuery(collection, query));
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
            return resolve(getCollectionWithQuery(data.collection, data.query));

        }).catch(function (error) {
            return reject(error);

        });
    })
}

export function createDocument(date) {
    return new Promise((resolve, reject) => {
        const collection = date.collection;
        const query = date.query;

        delete date.collection;
        delete date.query;
        db.collection(collection).add(date)
            .then(function () {
                return resolve(getCollectionWithQuery(collection, query));
            })
            .catch(function (error) {
                return reject(error);
            });
    })
}
