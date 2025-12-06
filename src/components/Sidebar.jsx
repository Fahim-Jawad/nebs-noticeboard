import React from 'react'

export default function Sidebar({ active, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="brand">Nebs-IT</div>
      <nav>
        <button className={`nav-item ${active === 'dashboard' ? 'active' : ''}`} onClick={() => onNavigate('dashboard')}>
          Dashboard
        </button>
        <div className="nav-section">Employee</div>
        <button className={`nav-item ${active === 'notice' ? 'active' : ''}`} onClick={() => onNavigate('board')}>
          Notice Board
        </button>
        <button className="nav-item" onClick={() => onNavigate('create')}>Create Notice</button>
      </nav>
    </aside>
  )
}
