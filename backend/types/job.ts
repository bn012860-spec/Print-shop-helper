import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  shopId: String,
  fileUrl: String,
  printType: String,
  colorMode: String,
  copies: Number,
  pageRange: String,
  status: {
    type: String,
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
