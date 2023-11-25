const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    fileData: { type: String, required: true },
  },
  {
    timestamps: true, // This line enables timestamps
  }
);

const FileModel = mongoose.model("File", fileSchema);

module.exports = { FileModel };
