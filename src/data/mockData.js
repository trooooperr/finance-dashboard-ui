export const CATEGORIES = [
  'Housing', 'Food & Dining', 'Transport', 'Shopping', 'Healthcare',
  'Entertainment', 'Utilities', 'Education', 'Freelance', 'Salary',
  'Investment', 'Insurance'
];

export const CATEGORY_COLORS = {
  'Housing':'#E8593C',
  'Food & Dining':'#F2A623',
  'Transport':'#4ECDC4',
  'Shopping':'#A855F7',
  'Healthcare':'#EC4899',
  'Entertainment':'#3B82F6',
  'Utilities':'#10B981',
  'Education':'#F59E0B',
  'Freelance':'#06B6D4',
  'Salary':'#22C55E',
  'Investment':'#8B5CF6',
  'Insurance':'#6B7280',
};

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export function generateTransactions() {
  const txns = [];
  const now = new Date(2026, 2, 20); 

  const expenseTemplates = [
    { desc: 'Monthly Rent', category: 'Housing', min: 12000, max: 18000 },
    { desc: 'Zomato Order', category: 'Food & Dining', min: 150, max: 600 },
    { desc: 'Swiggy Order', category: 'Food & Dining', min: 120, max: 450 },
    { desc: 'Uber Ride', category: 'Transport', min: 80, max: 400 },
    { desc: 'Ola Cab', category: 'Transport', min: 60, max: 350 },
    { desc: 'Amazon Purchase', category: 'Shopping', min: 300, max: 3000 },
    { desc: 'Flipkart Order', category: 'Shopping', min: 200, max: 2500 },
    { desc: 'Doctor Consultation', category: 'Healthcare', min: 500, max: 1500 },
    { desc: 'Pharmacy', category: 'Healthcare', min: 100, max: 800 },
    { desc: 'Netflix Subscription', category: 'Entertainment', min: 649, max: 649 },
    { desc: 'Movie Tickets', category: 'Entertainment', min: 300, max: 700 },
    { desc: 'Electricity Bill', category: 'Utilities', min: 800, max: 2200 },
    { desc: 'Internet Bill', category: 'Utilities', min: 500, max: 900 },
    { desc: 'Online Course', category: 'Education', min: 500, max: 5000 },
    { desc: 'Term Insurance', category: 'Insurance', min: 1200, max: 3000 },
  ];

  const incomeTemplates = [
    { desc: 'Monthly Salary', category: 'Salary', min: 45000, max: 55000 },
    { desc: 'Freelance Project', category: 'Freelance', min: 5000, max: 20000 },
    { desc: 'Dividend Income', category: 'Investment', min: 500, max: 3000 },
    { desc: 'Mutual Fund Returns', category: 'Investment', min: 1000, max: 5000 },
    { desc: 'Bonus', category: 'Salary', min: 5000, max: 15000 },
  ];

const totalMonths = 12;
const current = new Date(); 

for (let m = 0; m < totalMonths; m++) {
  const monthDate = new Date(
    current.getFullYear(),
    current.getMonth() - (totalMonths - 1 - m),
    1
  );
    incomeTemplates.forEach((tmpl, i) => {
      if (Math.random() > 0.3) {
        const day = randomBetween(1, 28);
        const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
        txns.push({
          id: generateId(),
          date: date.toISOString().split('T')[0],
          description: tmpl.desc,
          category: tmpl.category,
          type: 'income',
          amount: randomBetween(tmpl.min, tmpl.max),
          month: months[monthDate.getMonth()],
          year: monthDate.getFullYear(),
        });
      }
    });

    const numExpenses = randomBetween(10, 18);
    for (let e = 0; e < numExpenses; e++) {
      const tmpl = expenseTemplates[randomBetween(0, expenseTemplates.length - 1)];
      const day = randomBetween(1, 28);
      const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
      txns.push({
        id: generateId(),
        date: date.toISOString().split('T')[0],
        description: tmpl.desc,
        category: tmpl.category,
        type: 'expense',
        amount: randomBetween(tmpl.min, tmpl.max),
        month: months[monthDate.getMonth()],
        year: monthDate.getFullYear(),
      });
    }
  }

  return txns.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export const INITIAL_TRANSACTIONS = generateTransactions();

export function getMonthlyData(transactions) {
  const map = {};
  transactions.forEach(t => {
    const key = `${t.year}-${t.month}`;
    if (!map[key]) map[key] = { name: `${t.month} ${t.year}`, income: 0, expenses: 0, balance: 0 };
    if (t.type === 'income') map[key].income += t.amount;
    else map[key].expenses += t.amount;
  });
  return Object.values(map)
    .map(m => ({ ...m, balance: m.income - m.expenses }))
    .reverse();
}

export function getCategoryBreakdown(transactions) {
  const expenseMap = {};
  transactions.filter(t => t.type === 'expense').forEach(t => {
    expenseMap[t.category] = (expenseMap[t.category] || 0) + t.amount;
  });
  return Object.entries(expenseMap)
    .map(([name, value]) => ({ name, value, color: CATEGORY_COLORS[name] || '#888' }))
    .sort((a, b) => b.value - a.value);
}
