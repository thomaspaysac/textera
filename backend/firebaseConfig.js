require('dotenv').config();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "textera-e04fe.firebaseapp.com",
  projectId: "textera-e04fe",
  storageBucket: "textera-e04fe.appspot.com",
  messagingSenderId: "675932623864",
  appId: "1:675932623864:web:9d3b0727435744cf95fc0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

const uploadImage = async (path, file) => {
  /*const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(ref(storage, path))
  return url;*/
  console.log('Test');
}

module.exports = { uploadImage };

//export { firebaseConfig, app, storage, uploadImage }