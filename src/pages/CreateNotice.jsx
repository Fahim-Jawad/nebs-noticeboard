import React, { useState } from "react";

/**
 * CreateNotice (plain React, fetch to backend)
 * - posts to POST /api/notices
 * - expects backend running (CORS enabled)
 */

const DEPARTMENTS = [
  "Finance",
  "Sales Team",
  "Web Team",
  "Database Team",
  "Admin",
  "HR",
  "Operations",
];

export default function CreateNotice({ onPublished, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    noticeType: "",
    target: "Individual",
    departments: [],
    employeeId: "",
    employeeName: "",
    position: "",
    publishDate: "",
    expiryDate: "",
    priority: "Medium",
    visibility: "Public",
    body: "",
    attachments: [],
    reminder: false,
    reminderDate: "",
    tags: [],
  });

  const [loading, setLoading] = useState(false);
  const [successNotice, setSuccessNotice] = useState(null);
  const [error, setError] = useState(null);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleDepartmentToggle(dept) {
    setForm((prev) => {
      const exists = prev.departments.includes(dept);
      const deps = exists
        ? prev.departments.filter((d) => d !== dept)
        : [...prev.departments, dept];
      return { ...prev, departments: deps };
    });
  }

  function handleFileChange(e) {
    const files = Array.from(e.target.files || []);
    const names = files.map((f) => f.name);
    setForm((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...names],
    }));
  }

  function addTag(tag) {
    if (!tag) return;
    setForm((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
  }

  function removeTag(idx) {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== idx),
    }));
  }

  async function submit(e) {
    e.preventDefault();
    setError(null);
    // basic validation
    if (!form.title || !form.noticeType || !form.publishDate) {
      setError("Please fill Title, Notice Type and Publish Date.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title: form.title,
        noticeType: form.noticeType,
        target: form.target,
        departments: form.departments,
        employeeId: form.employeeId,
        employeeName: form.employeeName,
        position: form.position,
        publishDate: form.publishDate,
        expiryDate: form.expiryDate || null,
        priority: form.priority,
        visibility: form.visibility,
        body: form.body,
        attachments: form.attachments,
        reminder: !!form.reminder,
        reminderDate: form.reminder ? form.reminderDate : null,
        tags: form.tags,
        published: true, // when you click Publish, published true
      };

      const res = await fetch("/api/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Failed to create notice");
      }
      const data = await res.json();
      setSuccessNotice(data.notice || data); // depending on backend
      setForm({
        title: "",
        noticeType: "",
        target: "Individual",
        departments: [],
        employeeId: "",
        employeeName: "",
        position: "",
        publishDate: "",
        expiryDate: "",
        priority: "Medium",
        visibility: "Public",
        body: "",
        attachments: [],
        reminder: false,
        reminderDate: "",
        tags: [],
      });
      onPublished?.(data.notice || data);
    } catch (err) {
      setError(err.message || "Failed to publish");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card max-w-3xl">
      <h3>Create a Notice</h3>
      <p className="muted">Please fill in the details below</p>

      <form onSubmit={submit} className="form-grid" style={{ gap: 12 }}>
        <label>Target</label>
        <select name="target" value={form.target} onChange={handleChange}>
          <option value="Individual">Individual</option>
          <option value="All Department">All Department</option>
        </select>

        <label>Notice Title *</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
        />

        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <label>Employee ID</label>
            <input
              name="employeeId"
              value={form.employeeId}
              onChange={handleChange}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>Employee Name</label>
            <input
              name="employeeName"
              value={form.employeeName}
              onChange={handleChange}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>Position</label>
            <input
              name="position"
              value={form.position}
              onChange={handleChange}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <label>Notice Type *</label>
            <select
              name="noticeType"
              value={form.noticeType}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option>Warning / Disciplinary</option>
              <option>Performance Improvement</option>
              <option>Appreciation / Recognition</option>
              <option>Attendance / Leave Issue</option>
              <option>Payroll / Compensation</option>
              <option>Contract / Role Update</option>
              <option>Advisory / Personal Reminder</option>
              <option>General / Company-Wide</option>
            </select>
          </div>

          <div style={{ flex: 1 }}>
            <label>Publish Date *</label>
            <input
              type="date"
              name="publishDate"
              value={form.publishDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <label>Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={form.expiryDate}
              onChange={handleChange}
            />
          </div>

          <div style={{ width: 200 }}>
            <label>Priority</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div style={{ width: 200 }}>
            <label>Visibility</label>
            <select
              name="visibility"
              value={form.visibility}
              onChange={handleChange}
            >
              <option>Public</option>
              <option>Private</option>
            </select>
          </div>
        </div>

        <label>Departments (select multiple)</label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {DEPARTMENTS.map((d) => (
            <label
              key={d}
              style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <input
                type="checkbox"
                checked={form.departments.includes(d)}
                onChange={() => handleDepartmentToggle(d)}
              />
              <span>{d}</span>
            </label>
          ))}
        </div>

        <label>Notice Body / Description</label>
        <textarea
          name="body"
          value={form.body}
          onChange={handleChange}
          rows={6}
        />

        <label>Attachments</label>
        <input type="file" multiple onChange={handleFileChange} />
        <div style={{ marginTop: 6 }}>
          {form.attachments.map((a, i) => (
            <div key={i} style={{ fontSize: 13, color: "#333" }}>
              {a}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <label
            style={{ display: "inline-flex", gap: 8, alignItems: "center" }}
          >
            <input
              type="checkbox"
              name="reminder"
              checked={form.reminder}
              onChange={handleChange}
            />
            Remind me
          </label>
          {form.reminder && (
            <input
              type="date"
              name="reminderDate"
              value={form.reminderDate}
              onChange={handleChange}
            />
          )}
        </div>

        <label>Tags</label>
        <TagInput
          tags={form.tags}
          onAdd={(t) => addTag(t)}
          onRemove={removeTag}
        />

        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "flex-end",
            marginTop: 18,
          }}
        >
          <button type="button" className="btn ghost" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="submit"
            className="btn"
            disabled={loading}
            onClick={submit}
          >
            {loading ? "Publishing..." : "Publish Notice"}
          </button>
        </div>

        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
      </form>

      {successNotice && <SuccessBox notice={successNotice} />}
    </div>
  );
}

/* small helper TagInput component */
function TagInput({ tags = [], onAdd = () => {}, onRemove = () => {} }) {
  const [val, setVal] = React.useState("");
  return (
    <div>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="Enter tag and press Add"
        />
        <button
          type="button"
          className="btn ghost"
          onClick={() => {
            onAdd(val.trim());
            setVal("");
          }}
        >
          Add
        </button>
      </div>
      <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {tags.map((t, i) => (
          <div
            key={i}
            style={{
              padding: "6px 10px",
              background: "#f1f5f9",
              borderRadius: 8,
              display: "inline-flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <span>{t}</span>
            <button
              type="button"
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
              onClick={() => onRemove(i)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* small success box (simple) */
function SuccessBox({ notice }) {
  return (
    <div
      style={{
        marginTop: 12,
        padding: 12,
        borderRadius: 8,
        background: "#ecfdf5",
        color: "#065f46",
      }}
    >
      <strong>Notice Published:</strong> {notice.title}
    </div>
  );
}
