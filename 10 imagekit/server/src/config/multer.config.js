import multer from "multer";

const storageForServer = multer.memoryStorage();

const upload = multer({ storage: storageForServer });

export default upload;
