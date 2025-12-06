// src/pages/NoticeBoard.jsx
import React, { useEffect, useState } from "react";
import NoticeTable from "../shared/NoticeTable";
import { fetchNotices } from "../utils/db";

export default function NoticeBoard({ onCreate, refreshKey }) {
  const [data, setData] = useState([]);

  async function load() {
    try {
      const res = await fetchNotices();

      if (res && Array.isArray(res.items)) {
        setData(res.items);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("NoticeBoard Load Error:", err);
      setData([]);
    }
  }

  useEffect(() => {
    load();
  }, [refreshKey]);

  return (
    <>
      <div className="page-header">
        <h2>Notice Management</h2>

        <button className="btn btn-orange" onClick={onCreate}>
          + Create Notice
        </button>
      </div>

      <div className="card">
        <NoticeTable data={data} onReload={load} />
      </div>
    </>
  );
}
