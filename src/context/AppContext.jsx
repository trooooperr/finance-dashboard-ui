import React, { createContext, useContext, useState, useMemo } from 'react';
import { INITIAL_TRANSACTIONS, getMonthlyData, getCategoryBreakdown } from '../data/mockData';

const AppContext = createContext(null);

const STORAGE_KEY = 'zorvyn_transactions';

function loadTransactions() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return INITIAL_TRANSACTIONS;
}

function saveTransactions(txns) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(txns)); } catch {}
}

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(loadTransactions);
  const [role, setRole] = useState('admin'); 
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date_desc');

  const addTransaction = (txn) => {
    const updated = [txn, ...transactions];
    setTransactions(updated);
    saveTransactions(updated);
  };

  const editTransaction = (id, updates) => {
    const updated = transactions.map(t => t.id === id ? { ...t, ...updates } : t);
    setTransactions(updated);
    saveTransactions(updated);
  };

  const deleteTransaction = (id) => {
    const updated = transactions.filter(t => t.id !== id);
    setTransactions(updated);
    saveTransactions(updated);
  };

  const resetData = () => {
    setTransactions(INITIAL_TRANSACTIONS);
    saveTransactions(INITIAL_TRANSACTIONS);
  };

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    }
    if (filterType !== 'all') result = result.filter(t => t.type === filterType);
    if (filterCategory !== 'all') result = result.filter(t => t.category === filterCategory);

    switch (sortBy) {
      case 'date_asc':  result.sort((a, b) => new Date(a.date) - new Date(b.date)); break;
      case 'date_desc': result.sort((a, b) => new Date(b.date) - new Date(a.date)); break;
      case 'amount_desc': result.sort((a, b) => b.amount - a.amount); break;
      case 'amount_asc':  result.sort((a, b) => a.amount - b.amount); break;
    }
    return result;
  }, [transactions, searchQuery, filterType, filterCategory, sortBy]);

  const summary = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return { income, expenses, balance: income - expenses };
  }, [transactions]);

  const monthlyData = useMemo(() => getMonthlyData(transactions), [transactions]);
  const categoryBreakdown = useMemo(() => getCategoryBreakdown(transactions), [transactions]);

  return (
    <AppContext.Provider value={{
      transactions, filteredTransactions, summary, monthlyData, categoryBreakdown,
      role, setRole, darkMode, setDarkMode, activeSection, setActiveSection,
      searchQuery, setSearchQuery, filterType, setFilterType,
      filterCategory, setFilterCategory, sortBy, setSortBy,
      addTransaction, editTransaction, deleteTransaction, resetData
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
