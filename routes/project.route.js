import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
} from "../controllers/project.controller.js";
import adminAuth  from "../middleware/auth.middleware.js";
import upload from "../utils/storage.js";

const router = express.Router();

// Public
router.get("/", getProjects);
router.get("/:id", getProjectById);

// Admin
router.post("/", adminAuth, upload.single("image"), createProject);
router.put("/:id", adminAuth, upload.single("image"), updateProject);

export default router;
