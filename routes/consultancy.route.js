import express from "express";
import {
  createConsultancy,
  getConsultancies,
  updateConsultancy,
} from "../controllers/consultancy.controller.js";
import adminAuth  from "../middleware/auth.middleware.js";
import upload from "../utils/storage.js";

const router = express.Router();

router.get("/", getConsultancies);
router.post("/", adminAuth, upload.single("image"), createConsultancy);
router.put("/:id", adminAuth, upload.single("image"), updateConsultancy);

export default router;