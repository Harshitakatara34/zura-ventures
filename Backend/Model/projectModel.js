const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    files: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
      },
    ],
  },
  {
    timestamps: true, // This line enables timestamps
  }
);

const ProjectModel = mongoose.model("project", projectSchema);

module.exports = { ProjectModel };
