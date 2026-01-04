import express from "express";
import { upsertContact, getContact } from "../controllers/contact.controller.js";
import  adminAuth  from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getContact);
router.put("/", adminAuth, upsertContact);

export default router;