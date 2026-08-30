const express = require("express");
const createUser = require("../controllers/user.controller");
const upload = require("../config/multer.config");

const router = express.Router();

router.post("/create", upload.array("profile_pic"), createUser);

module.exports = router;
