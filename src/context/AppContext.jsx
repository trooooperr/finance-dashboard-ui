import React, { createContext, useContext, useState, useMemo } from 'react';
import { INITIAL_TRANSACTIONS, getMonthlyData, getCategoryBreakdown } from '../data/mockData';

// global context
const AppContext = createContext(null);
export function AppProvider({ children }) {

  // mock transaction
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  // role (admin/user)
  const [role, setRole] = useState('admin'); 
  // dark mode toggle
  const [darkMode, setDarkMode] = useState(false);
  // active section (dashboard, transactions, insights)
  const [activeSection, setActiveSection] = useState('dashboard');

  // search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date_desc');

  // add new transaction
  const addTransaction = (txn) => {
    setTransactions([txn, ...transactions]); 
  };
  // edit existing transaction
  const editTransaction = (id, updates) => {
    setTransactions(transactions.map(t => t.id === id ? { ...t, ...updates } : t));
  };
  // delete transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };
  // filtered + searched + sorted transactions
  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    // search by description or category
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    }
    // type filter
    if (filterType !== 'all') result = result.filter(t => t.type === filterType);
    // category filter
    if (filterCategory !== 'all') result = result.filter(t => t.category === filterCategory);
    // sorting
    switch (sortBy) {
      case 'date_asc': result.sort((a, b) => new Date(a.date) - new Date(b.date)); break;
      case 'date_desc': result.sort((a, b) => new Date(b.date) - new Date(a.date)); break;
      case 'amount_asc': result.sort((a, b) => a.amount - b.amount); break;
      case 'amount_desc': result.sort((a, b) => b.amount - a.amount); break;
    }
    return result;
  }, [transactions, searchQuery, filterType, filterCategory, sortBy]);

  // summary-> total income, expenses, balance
  const summary = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return { income, expenses, balance: income - expenses };
  }, [transactions]);
  // monthly chart data
  const monthlyData = useMemo(() => getMonthlyData(transactions), [transactions]);
  // category breakdown (pie/bar charts)
  const categoryBreakdown = useMemo(() => getCategoryBreakdown(transactions), [transactions]);

  return (
    <AppContext.Provider value={{
      transactions,
      filteredTransactions,
      summary,
      monthlyData,
      categoryBreakdown,
      role, setRole,
      darkMode, setDarkMode,
      activeSection, setActiveSection,
      searchQuery, setSearchQuery,
      filterType, setFilterType,
      filterCategory, setFilterCategory,
      sortBy, setSortBy,
      addTransaction,
      editTransaction,
      deleteTransaction,
    }}>
      {children}
    </AppContext.Provider>
  );
}
export function useApp() {
  return useContext(AppContext);
}