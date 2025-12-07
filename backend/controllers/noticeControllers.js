// backend/controllers/noticeController.js
import Notice from "../models/Notice.js";

// Create a new notice
export const createNotice = async (req, res) => {
  try {
    // Expect body to contain the new notice fields
    const payload = req.body;

    // Basic server-side validation
    if (!payload.title || !payload.noticeType || !payload.publishDate) {
      return res
        .status(400)
        .json({ error: "title, noticeType and publishDate are required" });
    }

    const notice = await Notice.create(payload);
    return res.status(201).json({ notice });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Get notices with optional filters: ?status=published|draft|all, ?dept=Finance, ?search=term
export const getNotices = async (req, res) => {
  try {
    const { status, dept, search } = req.query;
    const filter = {};

    if (status === "published") filter.published = true;
    if (status === "draft") filter.published = false;

    if (dept) filter.departments = dept;

    if (search) {
      // simple text search over a few fields
      const r = new RegExp(search, "i");
      filter.$or = [
        { title: r },
        { employeeName: r },
        { employeeId: r },
        { body: r },
      ];
    }

    const notices = await Notice.find(filter).sort({
      publishDate: -1,
      createdAt: -1,
    });
    return res.json({ notices });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Toggle publish/unpublish
export const togglePublish = async (req, res) => {
  try {
    const { id } = req.params;
    const notice = await Notice.findById(id);
    if (!notice) return res.status(404).json({ error: "Notice not found" });

    notice.published = !notice.published;
    await notice.save();
    return res.json({ notice });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// View single notice
export const getNoticeById = async (req, res) => {
  try {
    const { id } = req.params;
    const notice = await Notice.findById(id);
    if (!notice) return res.status(404).json({ error: "Notice not found" });
    return res.json({ notice });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
