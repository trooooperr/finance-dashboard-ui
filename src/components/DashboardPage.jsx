import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import SummaryCards from './SummaryCards';
import { BalanceTrendChart, SpendingBreakdownChart, MonthlyBarChart } from './Charts';
import { ArrowRight, Shield, Eye, ChevronDown, ChevronUp } from 'lucide-react';

export default function DashboardPage() {
  const { role, transactions, setActiveSection } = useApp();
  const recent = [...transactions].slice(0, 5);

  const [openId, setOpenId] = useState(null);

  const amountClass = (type) => {
    if (type === 'income') return 'amount-positive';
    if (type === 'expense') return 'amount-negative';
    if (type === 'investment') return 'amount-investment';
    return '';
  };

  const categoryClass = (category) => {
    if (!category) return '';
    return category.toLowerCase().replace(/\s/g, '-');
  };

  return (
    <div className="fade-in" style={{ padding: '16px 10px 16px 10px' }}>

      <div className="dashboard-header">
        <div>
          <div className="page-title">Overview</div>
          <div className="page-sub">
            {new Date().toLocaleDateString('en-IN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>

        <div className={`role-badge ${role}`}>
          {role === 'admin' ? <Shield size={12} /> : <Eye size={12} />}
          {role === 'admin' ? 'Admin View' : 'Viewer Mode'}
        </div>
      </div>
      <SummaryCards />

      <div className="charts-grid">
        <BalanceTrendChart />
        <SpendingBreakdownChart />
      </div>

      <div className="full-width-chart">
        <MonthlyBarChart />
      </div>

<div className="txn-section">
        <div className="section-header">
          <div className="chart-title" style={{ fontWeight: 700, fontSize: 18, marginBottom: 4, marginTop: 8 }}>Recent Transactions</div>
          <button  style={{ marginTop: 8 }} className="btn btn-ghost"
            onClick={() => setActiveSection('transactions')}> View all <ArrowRight size={15} />
          </button>
        </div>

        <div className="desktop-only txn-table-wrap">
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th style={{ textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>

              <tbody>
                {recent.map(txn => (
                  <tr key={txn.id}>
                    <td className="mono">{txn.date}</td>
                    <td>{txn.description || '—'}</td>
                    <td>
                      <span className={`cat-badge ${categoryClass(txn.category)}`}>
                        {txn.category || '—'}
                      </span>
                    </td>
                    <td>
                      <span className={`badge badge-${txn.type}`}>
                        {txn.type === 'income' ? '▲' : txn.type === 'expense' ? '▼' : '●'} {txn.type}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <span className={amountClass(txn.type)}>
                        {txn.type === 'income' ? '+' : txn.type === 'expense' ? '-' : ''}
                        ₹{txn.amount.toLocaleString('en-IN')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mobile-only">
          {recent.map(txn => {
            const isOpen = openId === txn.id;
            return (
              <div key={txn.id} className={`txn-card ${isOpen ? 'open' : ''}`}>
                <div
                  className="txn-header"
                  onClick={() => setOpenId(isOpen ? null : txn.id)}
                >
                  <div className="txn-title">{txn.description || 'No description'}</div>
                  <div className="txn-right">
                    <span className={amountClass(txn.type)}>
                      {txn.type === 'income' ? '+' : txn.type === 'expense' ? '-' : ''}
                      ₹{txn.amount.toLocaleString('en-IN')}
                    </span>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>

                {isOpen && (
                  <div className="txn-body">
                    <div><strong>Date:</strong> {txn.date}</div>
                    <div><strong>Category:</strong> {txn.category || '—'}</div>
                    <div><strong>Type:</strong> {txn.type}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media(max-width: 750px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: block !important; }
        }
        @media(min-width: 750px) {
          .desktop-only { display: block !important; }
          .mobile-only { display: none !important; }
        }
      `}
      </style>
    </div>
  );
}
