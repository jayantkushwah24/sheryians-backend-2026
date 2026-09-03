import express from "express";
import createPost from "../controller/post.controller.js";
import upload from "../config/multer.config.js";

const route = express.Router();

route.post("/create", upload.single("image"), createPost);

export default route;
