// gcs.js

const { Storage } = require("@google-cloud/storage");
const streamifier = require("streamifier");

const storage = new Storage({
  keyFilename: "./assets/durable-micron-401223-8e5f3d1bf585.json",
  projectId: "durable-micron-401223",
});

const bucket = storage.bucket("tickets-storage");

exports.uploadToGCS = async (file, fileName) => {
  const blob = bucket.file(fileName);
  const blobStream = blob.createWriteStream({ resumable: false });
  const fileStream = streamifier.createReadStream(file);

  return new Promise((resolve, reject) => {
    fileStream
      .pipe(blobStream)
      .on("finish", () => {
        blob.makePublic().then(() => {
          resolve(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
        });
      })
      .on("error", (error) => {
        reject(
          `Unable to upload image, something went wrong: ${error.message}`
        );
      });
  });
};
