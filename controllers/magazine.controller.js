import Magazine from "../models/magzine.model.js";

/**
 * CREATE magazine
 */
export const createMagazine = async (req, res) => {
  try {
    const magazine = await Magazine.create(req.body);

    res.status(201).json(magazine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * VIEW magazine (get by id)
 */
export const getMagazineById = async (req, res) => {
  try {
    const magazine = await Magazine.findById(req.params.id);

    if (!magazine) {
      return res.status(404).json({ message: "Magazine not found" });
    }

    res.json(magazine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * UPDATE magazine
 */
export const updateMagazine = async (req, res) => {
  try {
    const magazine = await Magazine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!magazine) {
      return res.status(404).json({ message: "Magazine not found" });
    }

    res.json(magazine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
