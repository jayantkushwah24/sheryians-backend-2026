import express from "express";
import createUrlController from "../controllers/create.controller.js";
import getAllController from "../controllers/all.controller.js";

const router = express.Router();

/**
 * @POST /api/url/create
 */
router.post("/create", createUrlController);

/**
 * @GET /api/url/all
 */
router.get("/all", getAllController);

export default router;
