import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

// Amount ko readable format me convert karne ke liye (₹, K, L)
function fmt(n) {
  if (n >= 100000) return '₹' + (n / 100000).toFixed(2) + 'L';
  if (n >= 1000) return '₹' + (n / 1000).toFixed(1) + 'K';
  return '₹' + n.toLocaleString('en-IN');
}

// Ek single summary card component
function SummaryCard({ label, amount, sub, icon: Icon, type, useSubColor = false, isMobile }) {
  const isProfit = type === 'profit'; // Profit or Loss check
  const color = isProfit ? 'var(--accent)' : 'var(--red)'; // Color based on type

  return (
    <div
      className="card"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: isMobile ? 80 : 90,
        padding: isMobile ? '12px 16px' : '18px 20px',
        borderRadius: 16,
        gap: isMobile ? 12 : 16,
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow)',
      }}
    >
      {/* Left side: Label, Amount, Subtext */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{
          fontSize: isMobile ? 10 : 11,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--text2)',
          fontFamily: 'var(--mono)',
        }}>
          {label}
        </span>

        <span style={{
          fontSize: isMobile ? 20 : 24,
          fontWeight: 800,
          color,
          fontFamily: 'var(--mono)',
        }}>
          {fmt(amount)} {/* Formatted amount */}
        </span>

        <span style={{
          fontSize: isMobile ? 11 : 12,
          color: useSubColor ? color : 'var(--text2)',
          fontFamily: 'var(--mono)',
        }}>
          {sub} {/* (Profit/Loss or transactions count) */}
        </span>
      </div>

      {/* Right side: Icon */}
      <div style={{
        width: isMobile ? 32 : 36,
        height: isMobile ? 32 : 36,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg3)',
        border: '1px solid var(--border)',
        color,
      }}>
        <Icon size={isMobile ? 16 : 18} /> {/* Card icon */}
      </div>
    </div>
  );
}

// SummaryCards main component
export default function SummaryCards() {
  const { summary, transactions } = useApp(); // Global state
  const [width, setWidth] = useState(window.innerWidth); // Window width for responsiveness

  // Resize listener
  useEffect(() => {
    const resize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const isMobile = width < 600; // Mobile breakpoint
  const isTablet = width >= 650 && width < 750;
  const isLaptop = width > 750 && width < 1024;
  const isTabletLand = width >= 1024 && width < 1400;

  // Grid columns based on screen size
  const gridColumns = isMobile
    ? '1fr'
    : isTablet
    ? 'repeat(2, 1fr)'
    : isTabletLand
    ? 'repeat(3, 1fr)'
    : isLaptop
    ? 'repeat(3, 1fr)'
    : 'repeat(3, 1fr)';

  const gap = isMobile ? 8 : 8; // Gap between cards

  const incomeCount = transactions.filter((t) => t.type === 'income').length; // Income transaction count
  const expenseCount = transactions.filter((t) => t.type === 'expense').length; // Expense transaction count
  const isPositive = summary.balance >= 0; // Balance Profit/Loss check

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: gridColumns,
        marginBottom: isMobile ? 8 : 8,
        gap: gap,
      }}
    >
      {/* Net Balance Card */}
      <SummaryCard
        label="Net Balance"
        amount={Math.abs(summary.balance)}
        sub={isPositive ? '▲ Profit' : '▼ Loss'}
        icon={Wallet}
        type={isPositive ? 'profit' : 'loss'}
        useSubColor={true}
        isMobile={isMobile}
      />

      {/* Total Income Card */}
      <SummaryCard
        label="Total Income"
        amount={summary.income}
        sub={`${incomeCount} transactions`}
        icon={TrendingUp}
        type="profit"
        isMobile={isMobile}
      />

      {/* Total Expenses Card */}
      <SummaryCard
        label="Total Expenses"
        amount={summary.expenses}
        sub={`${expenseCount} transactions`}
        icon={TrendingDown}
        type="loss"
        isMobile={isMobile}
      />
    </div>
  );
}