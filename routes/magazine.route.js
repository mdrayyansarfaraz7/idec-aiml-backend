import express from "express";
import {
  createMagazine,
  getMagazineById,
  updateMagazine,
} from "../controllers/magazine.controller.js";
import adminAuth  from "../middleware/auth.middleware.js";

const router = express.Router();

// public (view)
router.get("/:id", getMagazineById);

// admin protected
router.post("/", adminAuth, createMagazine);
router.patch("/:id", adminAuth, updateMagazine);

export default router;
