const express = require("express");
const upload = require("../config/multer");

const router = express.Router();

router.post("/", upload.single("image"), (req, res) => {
  try {
    const file = req.file;
    const body = req.body;

    return res.status(200).json({
      message: "file recieved successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = router;
