# 💸 FinFlow — Personal Finance Dashboard

A full-stack personal finance dashboard built with the **MERN stack**. Track income and expenses, visualize spending by category, and get smart rule-based financial insights — all in a clean, responsive interface.

🔗 **Live Demo:** [https://finflow-ugh5.onrender.com](https://finflow-ugh5.onrender.com)
🔗 **API Base:** [https://finflow-ugh5.onrender.com/api/health](https://finflow-ugh5.onrender.com/api/health)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Dashboard Overview** | At-a-glance summary cards showing total income, total expenses, net balance, and top spending category |
| **Spending Visualization** | Interactive bar chart (Recharts) showing expense breakdown by category |
| **Smart Insights** | Rule-based financial insight engine — overspending warnings, food budget alerts, savings congratulations |
| **Transaction Management** | Full CRUD — add, view, filter, and delete transactions with inline form validation |
| **Advanced Filtering** | Filter transactions by category and custom date range in real time |
| **Responsive Design** | Fully responsive layout that works seamlessly across desktop, tablet, and mobile |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, React Router v6, Axios, Recharts |
| **Build Tool** | Vite 5 |
| **Styling** | Vanilla CSS with CSS Custom Properties (no frameworks) |
| **Backend** | Node.js, Express 4 |
| **Database** | MongoDB Atlas with Mongoose 8 |
| **Deployment** | Render (full-stack) |

---

## 📡 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/transactions` | Get all transactions (supports `category`, `startDate`, `endDate` query params) |
| `GET` | `/api/transactions/summary` | Get financial summary with category-wise breakdown |
| `POST` | `/api/transactions` | Create a new transaction |
| `DELETE` | `/api/transactions/:id` | Delete a transaction by ID |
| `GET` | `/api/health` | API health check |

---

## 📁 Folder Structure

```
fintech-dashboard/
├── client/                          # React frontend (Vite)
│   ├── src/
│   │   ├── api/
│   │   │   └── transactions.js      # Axios API layer
│   │   ├── components/
│   │   │   ├── AddTransactionForm.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── InsightBox.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── SpendingChart.jsx
│   │   │   ├── SummaryCards.jsx
│   │   │   └── TransactionList.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Transactions.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── vite.config.js
├── server/                          # Express backend
│   ├── controllers/
│   │   └── transactionController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── Transaction.js
│   ├── routes/
│   │   └── transactions.js
│   ├── server.js
│   └── seed.js
├── package.json
└── README.md
```

---

## 🧠 Design Decisions

- **Rule-based Insights over ML** — A prioritized rule engine (overspending → food budget → savings rate → default) provides immediate, deterministic feedback without requiring training data or external AI services. Ideal for a personal finance tool where users need actionable, understandable advice.

- **Recharts for Visualization** — Chosen over D3 or Chart.js for its declarative, React-native components, built-in responsive containers, and clean defaults — all with a smaller bundle footprint.

- **Vanilla CSS with Custom Properties** — No CSS framework dependency. A design-token system via CSS custom properties ensures consistent theming, easy maintenance, and zero runtime overhead.

- **No Authentication** — Intentionally a single-user personal tracker. Omitting auth removes onboarding friction and keeps the focus on core finance features.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
