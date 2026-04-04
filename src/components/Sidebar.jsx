import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard, ArrowLeftRight, Lightbulb,
  Sun, Moon, Shield, Eye
} from 'lucide-react';

export default function Sidebar({ mobileOpen, onClose }) {
  const { activeSection, setActiveSection, role, setRole, darkMode, setDarkMode } = useApp();

  const nav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
    { id: 'insights', label: 'Insights', icon: Lightbulb },
  ];

  const navigate = (id) => {
    setActiveSection(id);
    onClose?.();
  };

  return (
    <aside className={`sidebar${mobileOpen ? ' open' : ''}`}>
      <div className="logo">
        <div className="logo-mark">Z</div>
        <div>
          <div className="logo-name">Zorvyn</div>
          <div className="logo-sub">Finance Dashboard</div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: '12px 0' }}>
        {nav.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`nav-item${activeSection === id ? ' active' : ''}`}
            onClick={() => navigate(id)}
          >
            <Icon size={16} className="nav-icon" />
            {label}
          </button>
        ))}
      </nav>

      <div style={{ padding: '0 12px 12px' }}>
        <div style={{ fontSize: 10, fontFamily: 'var(--mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8, paddingLeft: 6 }}>View Role</div>
        <div className="role-toggle" style={{ width: '100%', justifyContent: 'center' }}>
          <button
            className={`role-btn${role === 'admin' ? ' active' : ''}`}
            onClick={() => setRole('admin')}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}
          >
            <Shield size={12} />
            Admin
          </button>
          <button
            className={`role-btn${role === 'viewer' ? ' active' : ''}`}
            onClick={() => setRole('viewer')}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}
          >
            <Eye size={12} />
            Viewer
          </button>
        </div>
      </div>

      <div style={{ padding: '0 18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: 12, marginTop: 4 }}>
        <span style={{ fontSize: 12, color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 6 }}>
          {darkMode ? <Moon size={13} /> : <Sun size={13} />}
          {darkMode ? 'Dark mode' : 'Light mode'}
        </span>

          <button
  onClick={() => setDarkMode(d => !d)}
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
