import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, CATEGORY_COLORS } from '../data/mockData';
import TransactionModal from './TransactionModal';
import { Plus, Search, Pencil, Trash2, Download, ChevronDown, ChevronUp } from 'lucide-react';

// Export CSV
function exportCSV(transactions) {
  const header = 'Date,Description,Category,Type,Amount\n';
  const rows = transactions.map(t =>
    `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`
  ).join('\n');
  const blob = new Blob([header + rows], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'zorvyn_transactions.csv';
  a.click();
  URL.revokeObjectURL(url);
}

export default function TransactionsPage() {
  const {
    filteredTransactions, role, deleteTransaction,
    searchQuery, setSearchQuery,
    filterType, setFilterType,
    filterCategory, setFilterCategory,
    sortBy, setSortBy
  } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [editTxn, setEditTxn] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});

  const handleEdit = (txn) => { setEditTxn(txn); setShowModal(true); };
  const handleAdd = () => { setEditTxn(null); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditTxn(null); };
  const toggleExpand = (id) => { setExpandedCards(prev => ({ ...prev, [id]: !prev[id] })); }

  return (
    <div className="fade-in" style={{ padding: 16 }}>
      <div className="page-title" style={{ fontSize: 24, fontWeight: 700 }}>Transactions</div>
      <div className="page-sub" style={{ marginBottom: 16, fontSize: 13, color: 'var(--text2)' }}>
        {filteredTransactions.length} records found
      </div>

      <div className="filter-bar-mobile" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        <div style={{ flex: '1 1 100%', position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)' }} />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 10px 8px 32px',
              borderRadius: 8,
              border: '1px solid var(--border)',
              outline: 'none',
              fontSize: 14,
              background: 'var(--bg2)',
              color: 'var(--text)',
            }}
          />
        </div>

        <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ flex: '1 1 48%', minWidth: 100 }}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={{ flex: '1 1 48%', minWidth: 100 }}>
          <option value="all">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ flex: '1 1 48%', minWidth: 100 }}>
          <option value="date_desc">Date ↓</option>
          <option value="date_asc">Date ↑</option>
          <option value="amount_desc">Amount ↓</option>
          <option value="amount_asc">Amount ↑</option>
        </select>

        <button className="btn btn-ghost" onClick={() => exportCSV(filteredTransactions)} style={{ flex: '1 1 48%', fontSize: 12, padding: '6px 8px' }}>
          <Download size={14} /> Export CSV
        </button>

        {role === 'admin' && (
          <button className="btn btn-primary" onClick={handleAdd} style={{ flex: '1 1 48%', fontSize: 12, padding: '6px 8px' }}>
            <Plus size={14} /> Add
          </button>
        )}
      </div>

      <div className="desktop-only" style={{ display: 'block', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px', minWidth: 700 }}>
          <thead>
            <tr style={{ textAlign: 'left', fontSize: 14, color: 'var(--text2)', borderBottom: '1px solid var(--border)' }}>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
              {role === 'admin' && <th style={{ textAlign: 'center' }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(txn => (
              <tr key={txn.id} style={{
                background: 'var(--bg2)',
                borderRadius: 12,
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                boxShadow: 'var(--shadow)',
              }}>
                <td style={{ fontFamily: 'var(--mono)', fontWeight: 500, fontSize: 12, color: 'var(--text2)', padding: '12px 16px', whiteSpace: 'nowrap' }}>{txn.date}</td>
                <td style={{ fontSize: 13, fontWeight: 700, padding: '12px 16px' }}>{txn.description}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '6px 14px',
                    borderRadius: 20,
                    backgroundColor: `${CATEGORY_COLORS[txn.category]}33`,
                    color: CATEGORY_COLORS[txn.category],
                    fontWeight: 500,
                    fontSize: 13,
                  }}>
                    {txn.category}
                  </span>
                </td>
                <td style={{ padding: '12px 0px' }}>
                  <span style={{ color: txn.type === 'income' ? 'var(--accent)' : 'var(--red)', fontWeight: 600, fontSize: 12 }}>
                    {txn.type === 'income' ? '▲' : '▼'} {txn.type}
                  </span>
                </td>
                <td style={{ textAlign: 'right', padding: '12px 16px', fontSize: 12, fontWeight: 600, color: txn.type === 'income' ? 'var(--accent)' : 'var(--red)' }}>
                  {txn.type === 'income' ? '+' : '-'}₹{txn.amount.toLocaleString('en-IN')}
                </td>
                {role === 'admin' && (
                  <td style={{ textAlign: 'center', padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                      <button className="btn-icon" onClick={() => handleEdit(txn)} title="Edit"><Pencil size={16} /></button>
                      <button className="btn-icon btn-danger" onClick={() => deleteTransaction(txn.id)} title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mobile-only" style={{ display: 'none' }}>
        {filteredTransactions.map(txn => (
          <div key={txn.id} style={{
            background: 'var(--bg2)',
            borderRadius: 12,
            marginBottom: 6,
            border: '1px solid var(--border)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', cursor: 'pointer' }} onClick={() => toggleExpand(txn.id)}>
              <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>{txn.description}</div>
              <div style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center' }}>
                {expandedCards[txn.id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </div>
            {expandedCards[txn.id] && (
              <div style={{ padding: '8px 12px', borderTop: '1px solid var(--border)', fontSize: 13, color: 'var(--text2)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div><strong>Date:</strong> {txn.date}</div>
                <div><strong>Category:</strong> <span style={{ fontWeight: 600, color: CATEGORY_COLORS[txn.category] }}>{txn.category}</span></div>
                <div><strong>Type:</strong> <span style={{ fontWeight: 600, color: txn.type === 'income' ? 'var(--accent)' : 'var(--red)' }}>{txn.type}</span></div>
                <div><strong>Amount:</strong> <span style={{ fontWeight: 600, color: txn.type === 'income' ? 'var(--accent)' : 'var(--red)' }}>
                  {txn.type === 'income' ? '+' : '-'}₹{txn.amount.toLocaleString('en-IN')}
                </span></div>
                {role === 'admin' && (
                  <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                    <button className="btn-icon" onClick={() => handleEdit(txn)} title="Edit"><Pencil size={16} /></button>
                    <button className="btn-icon btn-danger" onClick={() => deleteTransaction(txn.id)} title="Delete"><Trash2 size={16} /></button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && <TransactionModal transaction={editTxn} onClose={closeModal} />}

      <style>{`
        @media(max-width: 750px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: block !important; }
        }
        @media(min-width: 750px) {
          .desktop-only { display: block !important; }
          .mobile-only { display: none !important; }
        }
      `}</style>
    </div>
  );
}