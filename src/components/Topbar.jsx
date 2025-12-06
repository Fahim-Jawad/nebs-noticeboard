import React from 'react'

export default function Topbar() {
  const today = new Date().toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })
  return (
    <header className="topbar">
      <div>
        <div className="greeting">Good Afternoon</div>
        <div className="date">{today}</div>
      </div>
      <div className="user">Asif Riaj <span className="role"> | HR</span></div>
    </header>
  )
}
