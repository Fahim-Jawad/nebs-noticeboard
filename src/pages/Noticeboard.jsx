import React, { useState, useEffect } from "react";
import NoticeTable from "../shared/NoticeTable";
import { fetchNotices } from "../utils/db";

export default function NoticeBoard({ onCreate, refreshKey }) {
  // filters
  const [dept, setDept] = useState("All Department");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all"); // all | published | unpublished
  const [date, setDate] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ items: [], total: 0, page: 1 });
  const limit = 8;

  async function load(p = 1) {
    const res = await fetchNotices(p, limit);
    // client filtering
    let items = res.items.slice();
    if (dept && dept !== "All Department")
      items = items.filter((i) => i.target === dept);
    if (search) {
      const s = search.toLowerCase();
      items = items.filter(
        (i) =>
          (i.employeeName || "").toLowerCase().includes(s) ||
          (i.employeeId || "").toLowerCase().includes(s) ||
          (i.title || "").toLowerCase().includes(s)
      );
    }
    if (status === "published") items = items.filter((i) => i.published);
    if (status === "unpublished") items = items.filter((i) => !i.published);
    if (date)
      items = items.filter((i) => (i.publishDate || "").startsWith(date));
    setData({ items, total: items.length, page: p });
  }

  useEffect(() => {
    load(1);
  }, [refreshKey]);

  return (
    <>
      <div className="page-header">
        <div>
          <h2>Notice Management</h2>
          <div className="sub">
            Active Notices: <strong>8</strong> | Draft Notice:{" "}
            <strong>4</strong>
          </div>
        </div>
        <div className="actions">
          <button className="btn" onClick={onCreate}>
            + Create Notice
          </button>
          <button className="btn ghost">All Draft Notice</button>
        </div>
      </div>

      <div className="filter-bar card">
        <div className="filters-row">
          <select value={dept} onChange={(e) => setDept(e.target.value)}>
            <option>All Department</option>
            <option>Finance</option>
            <option>Sales Team</option>
            <option>Web Team</option>
            <option>Database Team</option>
            <option>Admin</option>
            <option>Individual</option>
            <option>HR</option>
          </select>
          <input
            placeholder="Employee Id or Name or Title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
            <option value="draft">Draft</option>
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button className="btn" onClick={() => load(1)}>
            Reset Filters
          </button>
        </div>
      </div>

      <NoticeTable data={data.items} onReload={() => load(page)} />
    </>
  );
}
