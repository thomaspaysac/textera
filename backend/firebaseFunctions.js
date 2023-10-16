require('dotenv').config();
// Set up Firebase
const admin = require("firebase-admin");
const { getStorage, getDownloadURL } = require('firebase/storage');
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_BUCKET,
});

const bucket = admin.storage().bucket();

//function to upload file
const uploadFile = async (filepath, filename) => {
	const file = await bucket.upload(filepath, {
		gzip: true,
		destination: filename + '.jpg',
		metadata: {
			cacheControl: 'public, max-age=31536000'
		}
	});
  const trimUrl = file[0];
  console.log(file[0].metadata.mediaLink);
	//console.log(`${filename} uploaded to bucket.`);
}

const generateSignedUrl = async (filename) => {
	const options = {
		version: 'v2',
		action: 'read',
		expires: Date.now() + 1000 * 60 * 60
	};

	const [url] = await bucket.file(filename).getSignedUrl(options);
	console.log(url);
};

module.exports = { uploadFile, generateSignedUrl };