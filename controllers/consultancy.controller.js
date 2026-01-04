import Consultancy from "../models/consultancy.model.js";

// CREATE
export const createConsultancy = async (req, res) => {
  try {
    const { title, description, link } = req.body;

    const consultancy = await Consultancy.create({
      title,
      description,
      link,
      imgUrl: req.file?.path,
    });

    res.status(201).json(consultancy);
  } catch (error) {
    res.status(500).json({ message: "Failed to create consultancy" });
  }
};

// READ (Public)
export const getConsultancies = async (req, res) => {
  try {
    const consultancies = await Consultancy.find().sort({ createdAt: -1 });
    res.json(consultancies);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch consultancies" });
  }
};

// UPDATE
export const updateConsultancy = async (req, res) => {
  try {
    const consultancy = await Consultancy.findById(req.params.id);

    if (!consultancy) {
      return res.status(404).json({ message: "Consultancy not found" });
    }

    consultancy.title = req.body.title ?? consultancy.title;
    consultancy.description = req.body.description ?? consultancy.description;
    consultancy.link = req.body.link ?? consultancy.link;

    if (req.file) {
      consultancy.imgUrl = req.file.path;
    }

    await consultancy.save();
    res.json(consultancy);
  } catch (error) {
    res.status(500).json({ message: "Failed to update consultancy" });
  }
};
