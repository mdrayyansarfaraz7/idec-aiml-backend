import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";

export const adminLogin = async (req, res) => {
  const { email, secret } = req.body;

  if (!email || !secret) {
    return res.status(400).json({ message: "Email and secret required" });
  }

  const admin = await Admin.findOne({ email, isActive: true });
  if (!admin) {
    return res.status(401).json({ message: "Not authorized" });
  }

  if (secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ message: "Invalid admin secret" });
  }

  const token = jwt.sign(
    {
      adminId: admin._id,
      email: admin.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3d" }
  );

  res.cookie("admin_token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({
    admin: {
      name: admin.name,
      email: admin.email,
    },
  });
};

export const adminLogout = (req, res) => {
  res.clearCookie("admin_token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  res.json({ message: "Logged out" });
};

export const addAdmin = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  const existingAdmin = await Admin.findOne({ email });

  if (existingAdmin) {
    return res.status(409).json({ message: "Admin already exists" });
  }

  const admin = await Admin.create({
    name,
    email,
  });

  res.status(201).json({
    message: "Admin added successfully",
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
    },
  });
};

export const deactivateAdmin = async (req, res) => {
  const { adminId } = req.params;

  const admin = await Admin.findById(adminId);

  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  if (!admin.isActive) {
    return res.status(400).json({ message: "Admin already deactivated" });
  }

  admin.isActive = false;
  await admin.save();

  res.json({ message: "Admin deactivated successfully" });
};

export const checkAdminAuth = (req, res) => {
  res.json({
    admin: req.admin,
    authenticated: true,
  });
};