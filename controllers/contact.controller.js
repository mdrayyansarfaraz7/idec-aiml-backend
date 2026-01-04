import Contact from "../models/contact.model.js";

// Admin: create or update (singleton)
export const upsertContact = async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email required" });
  }

  const contact = await Contact.findOneAndUpdate(
    {},
    { name, email, phone },
    { new: true, upsert: true }
  );

  res.json(contact);
};

// Public
export const getContact = async (req, res) => {
  const contact = await Contact.findOne();
  res.json(contact);
};
