// backend/routes/noticeRoutes.js
import express from "express";
import {
  createNotice,
  getNotices,
  togglePublish,
  getNoticeById
} from "../controllers/noticeController.js";

const router = express.Router();

router.post("/", createNotice);              // create
router.get("/", getNotices);                 // read all (filters supported)
router.get("/:id", getNoticeById);           // read single
router.patch("/:id/toggle", togglePublish);  // publish/unpublish toggle

export default router;
