export const CATEGORIES = [
  'Housing', 'Food & Dining', 'Transport', 'Shopping', 'Healthcare',
  'Entertainment', 'Education','Investment', 'Insurance'];

export const CATEGORY_COLORS = {
  'Housing':'#E8593C',
  'Food & Dining':'#F2A623',
  'Transport':'#4ECDC4',
  'Shopping':'#A855F7',
  'Healthcare':'#EC4899',
  'Entertainment':'#3B82F6',
  'Utilities':'#10B981',
  'Education':'#F59E0B',
  'Salary':'#22C55E',
  'Investment':'#8B5CF6',
  'Insurance':'#6B7280',
};

export const INITIAL_TRANSACTIONS = [
  // APR 2026 
  { id:'t1', date:'2026-04-02', description:'Monthly Salary', category:'Salary', type:'income', amount:50000, month:'Apr', year:2026 },
  { id:'t2', date:'2026-04-04', description:'House Rent', category:'Housing', type:'expense', amount:12000, month:'Apr', year:2026 },
  { id:'t3', date:'2026-04-06', description:'Amazon Purchase', category:'Shopping', type:'expense', amount:3500, month:'Apr', year:2026 },
  { id:'t4', date:'2026-04-08', description:'Mutual Fund', category:'Investment', type:'income', amount:2500, month:'Apr', year:2026 },

  // MAR 2026 
  { id:'t5', date:'2026-03-01', description:'Monthly Salary', category:'Salary', type:'income', amount:50000, month:'Mar', year:2026 },
  { id:'t6', date:'2026-03-03', description:'Groceries', category:'Food & Dining', type:'expense', amount:1800, month:'Mar', year:2026 },
  { id:'t7', date:'2026-03-05', description:'Netflix', category:'Entertainment', type:'expense', amount:400, month:'Mar', year:2026 },


  // FEB 2026 
  { id:'t9', date:'2026-02-02', description:'Monthly Salary', category:'Salary', type:'income', amount:50000, month:'Feb', year:2026 },
  { id:'t10', date:'2026-02-04', description:'House Renovation', category:'Housing', type:'expense', amount:60000, month:'Feb', year:2026 },
  { id:'t11', date:'2026-02-06', description:'Uber Ride', category:'Transport', type:'expense', amount:2000, month:'Feb', year:2026 },
  { id:'t12', date:'2026-02-08', description:'Doctor Visit', category:'Healthcare', type:'expense', amount:1500, month:'Feb', year:2026 },

  // JAN 2026 
  { id:'t13', date:'2026-01-03', description:'Monthly Salary', category:'Salary', type:'income', amount:48000, month:'Jan', year:2026 },
  { id:'t14', date:'2026-01-05', description:'Groceries', category:'Food & Dining', type:'expense', amount:1800, month:'Jan', year:2026 },
  { id:'t15', date:'2026-01-07', description:'House Rent', category:'Housing', type:'expense', amount:12000, month:'Jan', year:2026 },
  { id:'t16', date:'2026-01-10', description:'Amazon Purchase', category:'Shopping', type:'expense', amount:2500, month:'Jan', year:2026 },

  // DEC 2025 
  { id:'t17', date:'2025-12-02', description:'Monthly Salary', category:'Salary', type:'income', amount:50000, month:'Dec', year:2025 },
  { id:'t18', date:'2025-12-04', description:'Vacation Trip', category:'Entertainment', type:'expense', amount:15000, month:'Dec', year:2025 },
  { id:'t19', date:'2025-12-06', description:'Car Repair', category:'Transport', type:'expense', amount:15000, month:'Dec', year:2025 },

  // NOV 2025 
  { id:'t20', date:'2025-11-01', description:'Monthly Salary', category:'Salary', type:'income', amount:50000, month:'Nov', year:2025 },
  { id:'t21', date:'2025-11-03', description:'House Rent', category:'Housing', type:'expense', amount:12000, month:'Nov', year:2025 },
  { id:'t22', date:'2025-11-05', description:'Amazon Purchase', category:'Shopping', type:'expense', amount:2500, month:'Nov', year:2025 },

  // OCT 2025 
  { id:'t23', date:'2025-10-02', description:'Monthly Salary', category:'Salary', type:'income', amount:50000, month:'Oct', year:2025 },
  { id:'t24', date:'2025-10-04', description:'Groceries', category:'Food & Dining', type:'expense', amount:1800, month:'Oct', year:2025 },
  { id:'t25', date:'2025-10-06', description:'Online Course', category:'Education', type:'expense', amount:2500, month:'Oct', year:2025 },

  // SEP 2025 
  { id:'t26', date:'2025-09-01', description:'Monthly Salary', category:'Salary', type:'income', amount:50000, month:'Sep', year:2025 },
  { id:'t27', date:'2025-09-03', description:'House Renovation', category:'Housing', type:'expense', amount:60000, month:'Sep', year:2025 },
  { id:'t28', date:'2025-09-05', description:'Car Repair', category:'Transport', type:'expense', amount:15000, month:'Sep', year:2025 },

  // AUG 2025 
  { id:'t29', date:'2025-08-02', description:'Monthly Salary', category:'Salary', type:'income', amount:50000, month:'Aug', year:2025 },
  { id:'t30', date:'2025-08-04', description:'Groceries', category:'Food & Dining', type:'expense', amount:1800, month:'Aug', year:2025 },
  { id:'t31', date:'2025-08-06', description:'Doctor Visit', category:'Healthcare', type:'expense', amount:1200, month:'Aug', year:2025 },

  // JUL 2025 
  { id:'t32', date:'2025-07-01', description:'Monthly Salary', category:'Salary', type:'income', amount:50000, month:'Jul', year:2025 },
  { id:'t33', date:'2025-07-03', description:'House Rent', category:'Housing', type:'expense', amount:12000, month:'Jul', year:2025 },
  { id:'t34', date:'2025-07-05', description:'Amazon Purchase', category:'Shopping', type:'expense', amount:2500, month:'Jul', year:2025 },


  // JUN 2025 
  { id:'t36', date:'2025-06-02', description:'Monthly Salary', category:'Salary', type:'income', amount:50000, month:'Jun', year:2025 },
  { id:'t37', date:'2025-06-04', description:'Vacation Trip', category:'Entertainment', type:'expense', amount:35000, month:'Jun', year:2025 },
  { id:'t38', date:'2025-06-06', description:'Car Repair', category:'Transport', type:'expense', amount:25000, month:'Jun', year:2025 },
  { id:'t44', date:'2025-06-06', description:'L.I.C', category:'Investment', type:'expense', amount:3500, month:'Jun', year:2025 },

  // MAY 2025 
  { id:'t39', date:'2025-05-03', description:'Monthly Salary', category:'Salary', type:'income', amount:48000, month:'May', year:2025 },
  { id:'t40', date:'2025-05-05', description:'Groceries', category:'Food & Dining', type:'expense', amount:1800, month:'May', year:2025 },
  { id:'t41', date:'2025-05-07', description:'House Rent', category:'Housing', type:'expense', amount:12000, month:'May', year:2025 },
  { id:'t42', date:'2025-05-10', description:'Amazon Purchase', category:'Shopping', type:'expense', amount:2500, month:'May', year:2025 },
  { id:'t43', date:'2025-05-12', description:'Car Insurance', category:'Insurance', type:'expense', amount:1500, month:'May', year:2025 },
];

// --- Aggregation functions ---
export function getMonthlyData(transactions) {
  const map = {};
  transactions.forEach(t => {
    const key = `${t.year}-${t.month}`;
    if (!map[key]) map[key] = { name: `${t.month} ${t.year}`, income: 0, expenses: 0, balance: 0 };
    if (t.type === 'income') map[key].income += t.amount;
    else map[key].expenses += t.amount;
  });
  // Sort descending: latest month first
  return Object.values(map)
    .map(m => ({ ...m, balance: m.income - m.expenses }))
    .sort((a, b) => {
      const dateA = new Date(`${a.name.split(' ')[1]}-${a.name.split(' ')[0]}-01`);
      const dateB = new Date(`${b.name.split(' ')[1]}-${b.name.split(' ')[0]}-01`);
      return dateB - dateA;
    });
}

export function getCategoryBreakdown(transactions) {
  const expenseMap = {};
  // Initialize all categories with 0
  CATEGORIES.forEach(cat => expenseMap[cat] = 0);

  transactions.filter(t => t.type === 'expense').forEach(t => {
    expenseMap[t.category] += t.amount;
  });

  return Object.entries(expenseMap)
    .map(([name, value]) => ({ name, value, color: CATEGORY_COLORS[name] || '#888' }))
    .sort((a, b) => b.value - a.value);
}