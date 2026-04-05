import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import DashboardPage from './components/DashboardPage';
import TransactionsPage from './components/TransactionsPage';
import InsightsPage from './components/InsightsPage';
import { Menu, X } from 'lucide-react';
import './styles.css';

function AppShell() {
  const { activeSection, darkMode } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // light/dark mode apply karne ke liye
  useEffect(() => {
    document.body.className = darkMode ? '' : 'light-mode';
  }, [darkMode]);
  
  // defined all three pages 
  const pages = {
    dashboard: <DashboardPage />,
    transactions: <TransactionsPage />,
    insights: <InsightsPage />,
  };

  return (
    // flex for sidebar andcontent
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      
      {/* jab sidebar open ho toh background dark overlay dikhe */}
      {sidebarOpen && ( 
        <div 
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)', // dark effect
            zIndex: 99,
            display: 'none' 
          }}
          className="mobile-overlay"
        />
      )}
      
      {/* mobile ke liye open/close control pass kiya h */}
      <Sidebar 
        mobileOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* main content area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Mobile header */}
        <div 
          style={{
            display: 'none', // default hidden
            alignItems: 'center',
            gap: 12,
            padding: '12px 16px',
            background: 'var(--bg2)',
            borderBottom: '1px solid var(--border)',
          }} 
          className="mobile-header"
        >
          <button
            className="btn-icon"
            onClick={() => setSidebarOpen(o => !o)}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div style={{ fontWeight: 800, fontSize: 16 }}>
            Zorvyn Finance
          </div>
        </div>

        <main 
          className="main-content" 
          style={{ flex: 1, overflowY: 'auto' }}
        >
          {/* active section ke according page render hoga */}
          {pages[activeSection] || <DashboardPage />}
        </main>
      </div>

      {/* mobile responsiveness */}
      <style>{`
        @media (max-width: 900px) {
          .mobile-header { display: flex !important; } /* header show karo mobile me */
          .mobile-overlay { display: block !important; } /* overlay show karo */
        }
      `}</style>
    </div>
  );
}
export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}