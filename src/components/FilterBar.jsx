import React, { useState } from "react";

export default function FilterBar({ onFilter }) {
  const [filters, setFilters] = useState({
    employeeId: "",
    noticeType: "",
    department: "",
    status: "",
    from: "",
    to: "",
    search: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  }

  function applyFilters() {
    onFilter(filters);
  }

  function clearFilters() {
    setFilters({
      employeeId: "",
      noticeType: "",
      department: "",
      status: "",
      from: "",
      to: "",
      search: "",
    });
    onFilter({});
  }

  return (
    <div className="card" style={{ marginBottom: 20, padding: 16 }}>
      <h4 style={{ marginBottom: 10 }}>Filter By</h4>

      <div
        className="form-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
        }}
      >
        <div>
          <label>Employee ID</label>
          <input
            name="employeeId"
            value={filters.employeeId}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Notice Type</label>
          <select
            name="noticeType"
            value={filters.noticeType}
            onChange={handleChange}
          >
            <option value="">All</option>
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

        <div>
          <label>Department</label>
          <select
            name="department"
            value={filters.department}
            onChange={handleChange}
          >
            <option value="">All</option>
            <option>Finance</option>
            <option>Sales Team</option>
            <option>Web Team</option>
            <option>Database Team</option>
            <option>Admin</option>
            <option>HR</option>
            <option>Operations</option>
          </select>
        </div>

        <div>
          <label>Status</label>
          <select name="status" value={filters.status} onChange={handleChange}>
            <option value="">All</option>
            <option value="published">Published</option>
            <option value="draft">Unpublished</option>
          </select>
        </div>

        <div>
          <label>From</label>
          <input
            type="date"
            name="from"
            value={filters.from}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>To</label>
          <input
            type="date"
            name="to"
            value={filters.to}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Search</label>
          <input
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Keyword"
          />
        </div>
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
        <button className="btn" onClick={applyFilters}>
          Apply Filters
        </button>
        <button className="btn ghost" onClick={clearFilters}>
          Clear
        </button>
      </div>
    </div>
  );
}
