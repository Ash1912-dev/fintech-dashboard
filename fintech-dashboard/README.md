# FinTrack — Personal Finance Dashboard

A full-stack personal finance tracker built with the MERN stack. Track income and expenses, visualize spending by category, and get AI-style rule-based financial insights — all in a clean, responsive dashboard.

## Live Demo

[🔗 Live Demo — Coming Soon](#)

## Features

- **Dashboard Overview** — At-a-glance summary cards showing total income, total expense, net balance, and top spending category
- **Spending Visualization** — Interactive bar chart powered by Recharts showing expense breakdown by category
- **Smart Insights** — Rule-based financial insight engine that provides contextual feedback (overspending warnings, food budget alerts, savings congratulations)
- **Transaction Management** — Full CRUD: add, view, filter, and delete transactions with inline form validation
- **Advanced Filtering** — Filter transactions by category and custom date range in real time

## Tech Stack

| Layer      | Technology                                      |
| ---------- | ----------------------------------------------- |
| Frontend   | React 18, React Router v6, Axios, Recharts      |
| Build Tool | Vite 5                                           |
| Styling    | Plain CSS with CSS custom properties (no frameworks) |
| Backend    | Node.js, Express 4                               |
| Database   | MongoDB with Mongoose 8                          |
| Dev Tools  | Concurrently, Nodemon                            |

## Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/fintech-dashboard.git
cd fintech-dashboard

# 2. Install all dependencies (root + server + client)
npm run install:all

# 3. Set up environment variables
#    Server:
cp server/.env.example server/.env
#    → Edit server/.env and set your MONGODB_URI

#    Client:
cp client/.env.example client/.env
#    → The default VITE_API_URL works for local dev

# 4. Seed the database with sample transactions
cd server && npm run seed && cd ..

# 5. Start both server and client in dev mode
npm run dev
```

The app will be available at:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

## Environment Variables

### Server (`server/.env`)

| Variable       | Description                            | Example Value                                         |
| -------------- | -------------------------------------- | ----------------------------------------------------- |
| `MONGODB_URI`  | MongoDB connection string              | `mongodb+srv://user:pass@cluster.mongodb.net/fintech`  |
| `PORT`         | Port for the Express server            | `5000`                                                 |
| `FRONTEND_URL` | Production frontend URL (for CORS)     | `https://your-app.vercel.app`                          |
| `NODE_ENV`     | Environment mode                       | `development` or `production`                          |

### Client (`client/.env`)

| Variable       | Description                            | Example Value                          |
| -------------- | -------------------------------------- | -------------------------------------- |
| `VITE_API_URL` | Base URL for API requests              | `http://localhost:5000/api`            |

## API Endpoints

| Method   | Route                        | Description                           | Query Params                          |
| -------- | ---------------------------- | ------------------------------------- | ------------------------------------- |
| `GET`    | `/api/transactions`          | Get all transactions (with filters)   | `category`, `startDate`, `endDate`    |
| `GET`    | `/api/transactions/summary`  | Get financial summary + breakdown     | —                                     |
| `POST`   | `/api/transactions`          | Create a new transaction              | —                                     |
| `DELETE` | `/api/transactions/:id`      | Delete a transaction by ID            | —                                     |
| `GET`    | `/api/health`                | API health check                      | —                                     |

## Deployment

### Backend on Render

1. Create a **New Web Service** on [Render](https://render.com)
2. Connect your GitHub repository
3. Set **Root Directory** to `server/`
4. Set **Build Command** to `npm install`
5. Set **Start Command** to `node server.js`
6. Add environment variables:
   - `MONGODB_URI` — your MongoDB Atlas connection string
   - `PORT` — `5000`
   - `NODE_ENV` — `production`
   - `FRONTEND_URL` — your Vercel frontend URL (e.g. `https://fintrack.vercel.app`)
7. Deploy — Render will auto-deploy on every push to `main`

### Frontend on Vercel

1. Import your repository on [Vercel](https://vercel.com)
2. Set **Root Directory** to `client/`
3. Set **Build Command** to `npm run build`
4. Set **Output Directory** to `dist`
5. Add environment variable:
   - `VITE_API_URL` — your Render backend URL + `/api` (e.g. `https://fintech-api.onrender.com/api`)
6. Deploy — Vercel will auto-deploy on every push to `main`

## Folder Structure

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
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
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
│   ├── seed.js
│   ├── render.yaml
│   ├── package.json
│   └── .env.example
├── package.json                     # Root — concurrently scripts
├── .gitignore
└── README.md
```

## Design Decisions

**Rule-based Insights over ML:** A simple prioritized rule engine (overspending → food budget → savings rate → default) provides immediate, deterministic feedback without requiring training data or external AI services — ideal for a personal finance tool where users need actionable, understandable advice.

**Recharts for Visualization:** Recharts was chosen over D3 or Chart.js because it provides declarative, React-native components (no refs or imperative DOM manipulation), built-in responsive containers, and clean defaults that match the minimal design aesthetic — all with a smaller bundle footprint.

**No Authentication:** This is intentionally a single-user personal tracker. Omitting auth removes onboarding friction and keeps the focus on the core finance features. For production multi-tenant use, adding JWT or OAuth would be a natural next step.
