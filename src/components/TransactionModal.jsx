import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { useApp } from '../context/AppContext';

function generateId() { return Math.random().toString(36).substr(2, 9); }
function getMonth(dateStr) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const d = new Date(dateStr);
  return months[d.getMonth()];
}

export default function TransactionModal({ transaction, onClose }) {
  const { addTransaction, editTransaction } = useApp();
  const isEdit = Boolean(transaction);

  const [form, setForm] = useState({
    description: '',
    amount: '',
    category: 'Food & Dining',
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
    ...(transaction || {}),
  });

  const [error, setError] = useState('');

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = () => {
    if (!form.description.trim()) { setError('Description is required.'); return; }
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) { setError('Enter a valid amount.'); return; }
    if (!form.date) { setError('Date is required.'); return; }

    const d = new Date(form.date);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    const txn = {
      ...form,
      id: isEdit ? form.id : generateId(),
      amount: Number(form.amount),
      month: months[d.getMonth()],
      year: d.getFullYear(),
    };

    if (isEdit) editTransaction(txn.id, txn);
    else addTransaction(txn);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-title">
          <span>{isEdit ? 'Edit Transaction' : 'Add Transaction'}</span>
          <button className="btn-icon" onClick={onClose}><X size={16} /></button>
        </div>

        <div className="form-group">
          <label>Description</label>
          <input type="text" value={form.description} onChange={e => set('description', e.target.value)} placeholder="e.g. Salary, Netflix..." />
        </div>

        <div className="form-row">
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Amount (₹)</label>
            <input type="number" value={form.amount} onChange={e => set('amount', e.target.value)} placeholder="0" min="0" />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Date</label>
            <input type="date" value={form.date} onChange={e => set('date', e.target.value)} />
          </div>
        </div>

        <div className="form-row" style={{ marginTop: 12 }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Type</label>
            <select value={form.type} onChange={e => set('type', e.target.value)}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Category</label>
            <select value={form.category} onChange={e => set('category', e.target.value)}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {error && (
          <div style={{ color: 'var(--red)', fontSize: 12, marginTop: 10, fontFamily: 'var(--mono)' }}>{error}</div>
        )}

        <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {isEdit ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  );
}
