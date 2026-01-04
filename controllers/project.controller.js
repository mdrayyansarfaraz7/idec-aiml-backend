import Project from "../models/project.model.js";

/**
 * CREATE PROJECT (Admin)
 */
export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      techStack,
      year,
      link,
      isPublished,
    } = req.body;

    const project = await Project.create({
      title,
      description,
      techStack,
      year,
      link,
      isPublished,
      image: req.file?.path, // Cloudinary URL
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Failed to create project" });
  }
};

/**
 * VIEW ALL PROJECTS (Public)
 */
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ isPublished: true })
      .sort({ year: -1 });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

/**
 * VIEW PROJECT BY ID (Public)
 */
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project || !project.isPublished) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch project" });
  }
};

/**
 * UPDATE PROJECT (Admin)
 */
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.title = req.body.title ?? project.title;
    project.description = req.body.description ?? project.description;
    project.techStack = req.body.techStack ?? project.techStack;
    project.year = req.body.year ?? project.year;
    project.link = req.body.link ?? project.link;
    project.isPublished = req.body.isPublished ?? project.isPublished;

    if (req.file) {
      project.image = req.file.path;
    }

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Failed to update project" });
  }
};
