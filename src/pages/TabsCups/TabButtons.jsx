import React from 'react'
import './TabButtons.css'

export default function TabButtons({ tabs, activeKey, onChange }) {
  return (
    <div className="tab-buttons">
      {tabs.map(tab => (
        <button
          key={tab.key}
          className={`tab-button${activeKey === tab.key ? ' active' : ''}`}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
