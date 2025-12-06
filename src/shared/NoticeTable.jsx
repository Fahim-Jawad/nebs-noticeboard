import React, { useState } from "react";
import { togglePublish } from "../utils/db";

export default function NoticeTable({ data, onReload }) {
  const [loadingId, setLoadingId] = useState(null);

  async function handleToggle(id) {
    setLoadingId(id);
    await togglePublish(id);
    setLoadingId(null);
    onReload();
  }

  return (
    <table className="notice-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Department</th>
          <th>Status</th>
          <th style={{ width: "120px" }}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {(Array.isArray(data) ? data : []).map((n) => (
          <tr key={n.id}>
            <td>{n.title}</td>
            <td>{n.department || "—"}</td>

            <td>
              <span className={`badge ${n.published ? "published" : "unpublished"}`}>
                {n.published ? "Published" : "Unpublished"}
              </span>
            </td>

            <td>
              <button
                className="btn primary"
                onClick={() => handleToggle(n.id)}
                disabled={loadingId === n.id}
              >
                {loadingId === n.id
                  ? "..."
                  : n.published
                  ? "Unpublish"
                  : "Publish"}
              </button>
            </td>
          </tr>
        ))}

        {data.length === 0 && (
          <tr>
            <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
              No notices found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
