require('dotenv').config();
// Set up Firebase
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
		project_id: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY,
	}
),
  storageBucket: process.env.FIREBASE_BUCKET,
});

const bucket = admin.storage().bucket();

//function to upload file
const uploadFile = async (filepath, filename) => {
	const file = await bucket.upload(filepath, {
		gzip: true,
		destination: filename,
		public: true,
		metadata: {
			cacheControl: 'public, max-age=31536000'
		}
	});

	const imageUrl = file[0].metadata.mediaLink;
	return imageUrl;
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