const express = require("express");
const { ProjectModel } = require("../model/projectModel");
const { FileModel } = require("../model/fileModel");
const { UserModel } = require("../model/userModel");
const fileRouter = express.Router();

// Creating new file
fileRouter.post("/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;
    const { fileName, fileData } = req.body;

    if (!projectId || !fileName || !fileData) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    // Check if the project with given projectId exists
    const project = await ProjectModel.findById(projectId);
    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }

    // Create a new file linked to the project
    const newFile = new FileModel({ fileName, project: projectId, fileData });
    await newFile.save();

    // Push this file's ID to the project's files array
    project.files.push(newFile._id);
    await project.save();

    res.status(201).send({
      msg: `New file created inside project ${project.projectName}`,
      newFile,
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Find the file by its ID
fileRouter.get("/:fileId", async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const file = await FileModel.findById(fileId);

    if (!file) {
      return res.status(404).send({ message: "File not found" });
    }
    res.status(200).send({
      msg: "File found",
      file,
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Editing a file data or file name
fileRouter.patch("/:fileId", async (req, res) => {
  try {
    const { fileId } = req.params;
    const email = req.email;
    const newfileData = req.body.fileData;

    //Check if the user already exists with the provided email
    let user = await UserModel.findOne({ email });

    if (!user) {
      res.send(404).send({ msg: "There is no user from this id." });
    }

    if (typeof newfileData === "undefined") {
      return res.status(400).send({ message: "Missing newfileData" });
    }
    // Update the file with the new data
    const updatedFile = await FileModel.findByIdAndUpdate(
      fileId,
      { fileData: newfileData },
      { new: true }
    );

    if (!updatedFile) {
      return res
        .status(404)
        .send({ message: "File not found by this fileId." });
    }

    res.status(200).send({ msg: "File updated successfully!", updatedFile });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

fileRouter.delete("/:fileId", async (req, res) => {
  try {
    const { fileId } = req.params;
    console.log("inside delete", fileId, typeof fileId);
    const deletedFile = await FileModel.findByIdAndDelete(fileId);

    if (!deletedFile) {
      return res.status(404).send({ message: "File not found" });
    }

    // Remove the file ID from the associated project
    const updatedProject = await ProjectModel.updateMany(
      { files: fileId },
      { $pull: { files: fileId } }
    );

    res.send({ message: "File deleted successfully" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = { fileRouter };
