import React from "react";

export default function NoticeTable({ data = [], onReload }) {
  async function toggle(id) {
    await fetch(`/api/notices/${id}/toggle`, { method: "PATCH" });
    onReload?.();
  }

  return (
    <div className="card">
      <table className="notice-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Departments</th>
            <th>Publish Date</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: 20 }}>
                No notices found
              </td>
            </tr>
          )}
          {data.map((n) => (
            <tr key={n._id || n.id}>
              <td>{n.title}</td>
              <td>{n.noticeType}</td>
              <td>{(n.departments || []).join(", ")}</td>
              <td>
                {n.publishDate
                  ? new Date(n.publishDate).toLocaleDateString()
                  : "-"}
              </td>
              <td>{n.priority}</td>
              <td>
                <span
                  className={`badge ${
                    n.published ? "published" : "unpublished"
                  }`}
                >
                  {n.published ? "Published" : "Unpublished"}
                </span>
              </td>
              <td>
                <button className="link" onClick={() => toggle(n._id || n.id)}>
                  {n.published ? "Unpublish" : "Publish"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
