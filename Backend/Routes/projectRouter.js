const express = require("express");
const { ProjectModel } = require("../model/projectModel");
const { UserModel } = require("../model/userModel");
const projectRouter = express.Router();

//Logic to Fetch Files of a Project
projectRouter.get("/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;

    // Find the project and populate its files
    const project = await ProjectModel.findById(projectId).populate("files");

    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }

    res.send(project.files);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

projectRouter.post("/create", async (req, res) => {
  try {
    const { email, projectName } = req.body;
    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    let newProject = await ProjectModel.findOne({ projectName });

    if (newProject) {
      return res
        .status(200)
        .send({ message: "Project by this name already exists." });
    }

    // Create a new project linked to the user
    newProject = new ProjectModel({ projectName, user: user._id });
    await newProject.save();

    // Push this project's ID to the user's projects array
    user.projects.push(newProject._id);
    await user.save();

    res.status(201).send({ msg: "New Project Created", newProject });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Fetch all the projects by an email

projectRouter.get("/", async (req, res) => {
  try {
    const email = req.email;

    // Find the user by email and populate their projects
    const userProjects = await UserModel.findOne({ email }).populate({
      path: "projects",
      model: ProjectModel,
    });

    if (!userProjects) {
      return res.status(404).json({ message: "User not found" });
    }

    res.send(userProjects.projects);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = { projectRouter };
