const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
cloudinary.config({
    cloud_name: "chat-app12",
    api_key: "518864962489828",
    api_secret: "sCC-W6Mu3hiFdaYMByC3fqViWik",
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "app",
    allowedFormats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 100, height: 100, crop: "limit" }],
});

//for local storage.
// const upload = multer({ dest: 'uploads/' });
//for cloudinary storage.
const upload = multer({ storage: storage })
module.exports = upload;