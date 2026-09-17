import express from "express";
import createUrlController from "../controllers/create.controller.js";
import getAllUrlController from "../controllers/all.controller.js";
import deleteUrlController from "../controllers/delete.controller.js";

const router = express.Router();

/**
 * @POST /api/url/create
 */
router.post("/create", createUrlController);

/**
 * @GET /api/url/all
 */
router.get("/all", getAllUrlController);

/**
 * @DELETE /api/url/:id
 */
router.delete("/:id", deleteUrlController);

export default router;
