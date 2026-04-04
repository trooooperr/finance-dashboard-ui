import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

function fmt(n) {
  if (n >= 100000) return '₹' + (n / 100000).toFixed(2) + 'L';
  if (n >= 1000) return '₹' + (n / 1000).toFixed(1) + 'K';
  return '₹' + n.toLocaleString('en-IN');
}
function SummaryCard({ label, amount, sub, icon: Icon, type, useSubColor = false, isMobile }) {
  const isProfit = type === 'profit';
  const color = isProfit ? 'var(--accent)' : 'var(--red)';

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
      }}>

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
          {fmt(amount)}
        </span>

        <span style={{
          fontSize: isMobile ? 11 : 12,
          color: useSubColor ? color : 'var(--text2)',
          fontFamily: 'var(--mono)',
        }}>
          {sub}
        </span>
      </div>

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
        <Icon size={isMobile ? 16 : 18} />
      </div>
    </div>
  );
}

export default function SummaryCards() {
  const { summary, transactions } = useApp();
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const isMobile = width < 600;
  const isTablet = width >= 650 && width < 750;
  const isLaptop = width > 750 && width < 1024;
  const isTabletLand = width >= 1024 && width < 1400;

  const gridColumns = isMobile
    ? '1fr'
    : isTablet
    ? 'repeat(2, 1fr)'
    : isTabletLand
    ? 'repeat(3, 1fr)'
    : isLaptop
    ? 'repeat(3, 1fr)'
    : 'repeat(3, 1fr)';

  const gap = isMobile ? 8 : isTablet ? 8 : isTabletLand ? 8 : 8;

  const incomeCount = transactions.filter((t) => t.type === 'income').length;
  const expenseCount = transactions.filter((t) => t.type === 'expense').length;
  const isPositive = summary.balance >= 0;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: gridColumns,
        marginBottom: isMobile ? 8 : 8,
        gap: gap,
      }}
    >
      <SummaryCard
        label="Net Balance"
        amount={Math.abs(summary.balance)}
        sub={isPositive ? '▲ Profit' : '▼ Loss'}
        icon={Wallet}
        type={isPositive ? 'profit' : 'loss'}
        useSubColor={true}
        isMobile={isMobile}
      />

      <SummaryCard
        label="Total Income"
        amount={summary.income}
        sub={`${incomeCount} transactions`}
        icon={TrendingUp}
        type="profit"
        isMobile={isMobile}
      />

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