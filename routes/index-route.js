import express from "express";

import adminRoutes from "./auth.route.js";
import contactRoutes from "./contact.route.js";
import consultancyRoutes from "./consultancy.route.js";
import projectRoutes from "./project.route.js";
import magazineRoutes from "./magazine.route.js";

const router = express.Router();

router.use("/admin", adminRoutes);
router.use("/contact", contactRoutes);
router.use("/consultancy", consultancyRoutes);
router.use("/projects", projectRoutes);
router.use("/magazines", magazineRoutes);

export default router;
