/* eslint-disable default-case */
/* eslint-disable no-undef */
import firebase from './firebase';

function generateName() {
    return Math.random().toString(36).slice(2);
}

export function firebaseFileUpload(files, path) {
    return new Promise((resolve, reject) => {
        let uriOfFiles = [];

        let filesUploaded = 0;

        const arrOfFiles = [...new Array(...files)];

        arrOfFiles.forEach(file => {
            var uploadTask = firebase.storage().ref().child(`${path}/${generateName()}`).put(file);

            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                function (snapshot) {
                    // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    // console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            // console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            // console.log('Upload is running');
                            break;
                    }
                }, function (error) {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            reject("User doesn't have permission to access the object");
                            break;

                        case 'storage/canceled':
                            reject("User canceled the upload");
                            break;

                        case 'storage/unknown':
                            reject("Unknown error occurred, inspect error.serverResponse");
                            break;
                    }
                }, function () {
                    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        uriOfFiles.push(downloadURL);

                        filesUploaded++;

                        if (arrOfFiles.length === filesUploaded) {
                            resolve(uriOfFiles);
                        }
                    });
                });
        })

    })
}


export function firebaseGetUploadedFiles(path) {
    return new Promise((resolve, reject) => {
        const uriOfFiles = [];

        return firebase.storage().ref().child(path).listAll().then(function (res) {
            if (!res.items.length) return reject()
            return res.items.forEach(function (itemRef) {
                
                return itemRef.getDownloadURL().then(uri => {
                    uriOfFiles.push(uri);
                    if (res.items.length === uriOfFiles.length) return resolve(uriOfFiles)
                })
                
                
            });

        }).catch(function (error) {
            return reject(error)
        });
    })
}
