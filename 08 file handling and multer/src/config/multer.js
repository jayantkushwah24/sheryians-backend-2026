const multer = require("multer");

// we use diskStorage for saving file in our local storage
const storageForLocal = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

// we use memoryStorage for server
const storageForServer = multer.memoryStorage();

const upload = multer({ storage: storageForLocal });

module.exports = upload;
