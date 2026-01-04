// routes/admin.route.js
import express from "express";
import { adminLogin, adminLogout,addAdmin, deactivateAdmin ,checkAdminAuth } from "../controllers/auth.controller.js";
import adminAuth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/logout", adminAuth, adminLogout);

router.post("/add", adminAuth, addAdmin);
router.patch("/deactivate/:adminId", adminAuth, deactivateAdmin);

router.get("/me", adminAuth, checkAdminAuth);

export default router;