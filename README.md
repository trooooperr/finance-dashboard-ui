Zorvyn Finance Dashboard

Hi, I’m Alok 

This is my submission for the Frontend Developer Intern assignment.
I built Zorvyn as a modern, clean finance dashboard that feels like something you’d actually use daily — not just a demo. The focus was on clarity, usability, and making financial data easy to understand at a glance, even without a backend.

Getting Started

To run the project locally:

# Clone the repository
git clone <https://github.com/trooooperr/finance-dashboard-ui>

# Install dependencies
npm install

# Start the development server
npm run dev

Then open your browser at: http://localhost:5173￼

Note: All data is mock data stored locally in the project files (src/data). This means the app works fully offline, without a server or database.

🛠 Tech Stack
	•	React 18 — for building modular UI components
	•	Vite — fast development setup
	•	Recharts — responsive charts for visualizing data
	•	Lucide React — clean and lightweight icons
	•	Context API — simple state management
	•	Plain CSS — full control over styling
	•	localStorage — persist mock data changes during your session

What I Built

Dashboard

Quick financial overview using mock data:
	•	Net balance, total income, and expenses
	•	Trend chart showing financial movements over time (line graph)
	•	Category-wise spending (donut chart)
	•	Monthly comparison (bar chart)
	•	Recent transactions list

Goal: Understand your financial state within seconds, all using static/mock data.

Transactions Page

Explore your mock transactions in detail:
	•	Search instantly by name, amount, or category
	•	Filter by type (income/expense) and category
	•	Sort by date or amount
	•	Export data as CSV

Admin Mode:
	•	Add, edit, or delete transactions — changes are persisted in localStorage
	•	Viewer mode remains read-only

Role Switching (Admin / Viewer)

Simulates real-world behavior:
	•	Admin: Full access (add/edit/delete)
	•	Viewer: Read-only mode

This shows how UI can adapt based on permissions, even without a real backend.

Insights

Quick analysis based on mock data:
	•	Top spending categories
	•	Savings rate
	•	Avg Monthly Income
	•	Expense Trend
    •	Category Spending Analysis
	•	Monthly Comparison

Goal: Make data meaningful and readable without needing a server.

Design Approach
	•	Dark fintech-style UI — professional, modern, and easy on the eyes
	•	Typography: Sans-serif for UI, monospace for numbers
	•	Colors: Green → positive, Red → negative, minimal decoration
	•	Animations & transitions: Smooth, subtle effects for better UX

⚡ State Management
	•	React Context + useMemo manages mock transactions centrally
	•	Simple, lightweight, no need for Redux

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
vite.config.js      → Vite configuration for development/build


Note: All “data” interactions (add/edit/delete) update localStorage, so changes persist locally but not on a server.

Extra Features
	•	Responsive design (desktop & mobile)
	•	Dark/light mode toggle
	•	Smooth transitions
	•	Helpful empty states
	•	Fully offline — works entirely with mock data

Final Thoughts

This Dashboard is built like a real product, even without a backend:
	•	Clean, modern UI
	•	Readable insights
	•	Maintainable code
	•	Fully functional with mock data

Future improvements could include a backend, authentication, and real APIs. For now, it’s a polished, standalone dashboard that demonstrates frontend skills clearly.

Thanks for checking out!
