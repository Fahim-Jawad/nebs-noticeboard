import React, { useState } from "react";
import { saveNotice } from "../utils/db";
import SuccessPublishModal from '../shared/SuccessPublicModal'

export default function CreateNotice({ onPublished, onCancel }) {
  const [form, setForm] = useState({});
  const [success, setSuccess] = useState(null);

  function handle(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit() {
    const saved = await saveNotice({
      ...form,
      published: true,
    });
    setSuccess(saved);
    onPublished(saved);
  }

  return (
    <div className="card">
      <h2>Create Notice</h2>

      <input name="title" placeholder="Title" onChange={handle} />
      <select name="noticeType" onChange={handle}>
        <option>Select Type</option>
        <option>Warning</option>
        <option>Payroll</option>
      </select>

      <input type="date" name="publishDate" onChange={handle} />

      <textarea
        name="body"
        placeholder="Write details"
        rows="5"
        onChange={handle}
      />

      <div style={{ marginTop: 15 }}>
        <button className="btn ghost" onClick={onCancel}>Cancel</button>
        <button className="btn btn-orange" onClick={submit}>
          Publish Notice
        </button>
      </div>

      {success && (
        <SuccessPublishModal
          notice={success}
          onClose={() => setSuccess(null)}
          onCreateAnother={() => setSuccess(null)}
          onView={() => alert(JSON.stringify(success, null, 2))}
        />
      )}
    </div>
  );
}
