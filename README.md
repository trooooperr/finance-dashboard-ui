# Zorvyn Finance Dashboard  

Hi, I’m **Alok** 👋  

This is my submission for the **Frontend Developer Intern** assignment.  

I built **Zorvyn** as a modern, clean finance dashboard — something you’d actually enjoy using daily, not just a demo. The focus was on **clarity, usability, and making financial data easy to understand at a glance**, even without a backend.  

# Live Demo  

Check it out online: https://financeui-dashboard.vercel.app  

## 🚀 Getting Started  

To run the project locally:  

```
# Clone the repository
git clone https://github.com/trooooperr/finance-dashboard-ui

# Navigate to the project folder
cd finance-dashboard-ui

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open your browser at: http://localhost:5173￼

Note: All data is mock data stored locally in src/data, so the app works fully offline — no backend or database needed.

# Tech Stack
	•	React 18 — building modular UI components
	•	Vite — fast, optimized development setup
	•	Recharts — responsive and clean charts for data visualization
	•	Lucide React — lightweight icons
	•	Context API — simple state management
	•	Plain CSS — complete control over styling
	•	localStorage — persist mock data changes during your session

# What I Built.........

# Dashboard

A quick overview of your finances using mock data:
	•	Summary Cards — Net balance, total income, and expenses
	•	Trend Chart (Line Graph) — month-wise income and expense trend
	•	Category-wise Spending (Donut Chart) — see where your money goes
	•	Monthly Comparison (Bar Chart) — visualize spending month to month
	•	Recent Transactions — a list of latest activities

Goal: Understand your financial state within seconds, using only local/mock data.

# Transactions Page

Explore your mock transactions in detail:
	•	Search instantly by name, amount, or category
	•	Filter by type (income/expense) and category
	•	Sort by date or amount
	•	Export data as CSV

Admin Mode:
	•	Add, edit, or delete transactions — changes are saved in localStorage
	•	Viewer mode remains read-only

Role Switching (Admin / Viewer)

Simulates real-world permission changes:
	•	Admin: Full access (add/edit/delete)
	•	Viewer: Read-only mode

This demonstrates how the UI adapts based on user roles — even without a backend.

# Insights

Quick analysis based on mock data:
	•	Top spending categories
	•	Savings rate
	•	Average monthly income
	•	Expense trend over time
	•	Category-wise spending breakdown
	•	Monthly comparison

Goal: Make financial data meaningful and readable, without needing a server.

# Design Approach
	•	Dark fintech-style UI — modern, professional, and easy on the eyes
	•	Typography: Sans-serif for general UI, monospace for numbers (financial clarity)
	•	Colors: Green → positive, Red → negative, minimal distractions
	•	Animations & transitions: Smooth and subtle for a better UX

# State Management
	•	React Context + useMemo manages mock transactions centrally
	•	Lightweight and simple — no need for Redux or other heavy libraries

# Project Structure
```
src/
├─ components/      → UI components
├─ context/         → Global state
├─ data/            → Mock data files (transactions, categories)
├─ App.jsx          → Layout
├─ main.jsx         → Entry point
└─ styles.css       → Design system

public/
└─ index.html       → Main HTML file

package.json        → Project dependencies and scripts
vite.config.js      → Vite configuration
```

Note: All “data” interactions (add/edit/delete) update localStorage, so changes persist locally but not on a server.

# Extra Features
	•	Fully responsive design (desktop & mobile)
	•	Dark/light mode toggle
	•	Smooth transitions
	•	Helpful empty states
	•	Works completely offline with mock data

# Final Thoughts

This dashboard is built like a real product, even without a backend:
	•	Clean, modern UI
	•	Readable insights and graphs
	•	Maintainable, modular code
	•	Fully functional with mock data

Future improvements: Add backend, authentication, real APIs, or advanced filtering.

Thanks for checking out Zorvyn Finance Dashboard!
