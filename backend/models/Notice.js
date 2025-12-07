// backend/models/Notice.js
import mongoose from "mongoose";

const NoticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    noticeType: { type: String, required: true },
    target: { type: String, default: "Individual" }, // Individual | All Department
    departments: { type: [String], default: [] },
    employeeId: { type: String, default: null },
    employeeName: { type: String, default: null },
    position: { type: String, default: null },
    publishDate: { type: Date },
    expiryDate: { type: Date, default: null },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    visibility: { type: String, enum: ["Public", "Private"], default: "Public" },
    body: { type: String, default: "" },
    attachments: { type: [String], default: [] }, // store filenames or URLs
    reminder: { type: Boolean, default: false },
    reminderDate: { type: Date, default: null },
    tags: { type: [String], default: [] },
    published: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Notice", NoticeSchema);
