import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Untitled",
    },
    content: {
      type: String,
      default: "",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

noteSchema.index({ createdBy: 1, updatedAt: -1 });

const Note = mongoose.model("Note", noteSchema);

export default Note;
