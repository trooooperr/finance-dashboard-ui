import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard, ArrowLeftRight, Lightbulb,
  Sun, Moon, Shield, Eye
} from 'lucide-react';

export default function Sidebar({ mobileOpen, onClose }) {
  const { activeSection, setActiveSection, role, setRole, darkMode, setDarkMode } = useApp(); // Global state

  // Navigation items
  const nav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
    { id: 'insights', label: 'Insights', icon: Lightbulb },
  ];

  // Section change handler
  const navigate = (id) => {
    setActiveSection(id); // Active section update
    onClose?.(); 
  };

  return (
    <aside className={`sidebar${mobileOpen ? ' open' : ''}`}>
      {/* Logo Section */}
      <div className="logo">
        <div className="logo-mark">Z</div>
        <div>
          <div className="logo-name">Zorvyn</div>
          <div className="logo-sub">Finance Dashboard</div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <nav style={{ flex: 1, padding: '12px 0' }}>
        {nav.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`nav-item${activeSection === id ? ' active' : ''}`} // Active section highlight
            onClick={() => navigate(id)}
          >
            <Icon size={16} className="nav-icon" /> {/* Nav icon */}
            {label} {/* Nav label */}
          </button>
        ))}
      </nav>

      {/* Role Toggle Section */}
      <div style={{ padding: '0 12px 12px' }}>
        <div style={{
          fontSize: 10,
          fontFamily: 'var(--mono)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--text3)',
          marginBottom: 8,
          paddingLeft: 6
        }}>
          View Role
        </div>

        <div className="role-toggle" style={{ width: '100%', justifyContent: 'center' }}>
          {/* Admin Role Button */}
          <button
            className={`role-btn${role === 'admin' ? ' active' : ''}`} // Active role highlight
            onClick={() => setRole('admin')}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}
          >
            <Shield size={12} />
            Admin
          </button>

          {/* Viewer Role Button */}
          <button
            className={`role-btn${role === 'viewer' ? ' active' : ''}`} // Active role highlight
            onClick={() => setRole('viewer')}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}
          >
            <Eye size={12} />
            Viewer
          </button>
        </div>
      </div>

      {/* Dark/Light Mode Toggle */}
      <div style={{
        padding: '0 18px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid var(--border)',
        paddingTop: 12,
        marginTop: 4
      }}>
        <span style={{ fontSize: 12, color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 6 }}>
          {darkMode ? <Moon size={13} /> : <Sun size={13} />} {/* Icon based on mode */}
          {darkMode ? 'Dark mode' : 'Light mode'} {/* Mode text */}
        </span>

        {/* Toggle Button */}
        <button
          onClick={() => setDarkMode(d => !d)} // Toggle dark/light mode
          className="theme-icon-btn"
        >
          <span key={darkMode ? 'sun' : 'moon'}>
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </span>
        </button>
      </div>
    </aside>
  );
}