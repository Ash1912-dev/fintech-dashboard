const CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Health",
  "Entertainment",
  "Salary",
  "Freelance",
  "Investment",
  "Other",
];

/**
 * Format a number as Indian Rupee currency.
 * @param {number} value
 * @returns {string}
 */
function formatCurrency(value) {
  if (value == null || isNaN(value)) return "₹0.00";
  return `₹${Number(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function SummaryCards({ summary }) {
  if (!summary) return null;

  const {
    totalIncome = 0,
    totalExpense = 0,
    netBalance = 0,
    topSpendingCategory = "—",
  } = summary;

  const balanceIsPositive = netBalance >= 0;

  return (
    <div className="summary-cards" id="summary-cards">
      {/* Total Income */}
      <div className="summary-card summary-card--income" id="card-income">
        <div className="summary-card__label">Total Income</div>
        <div className="summary-card__value summary-card__value--green">
          {formatCurrency(totalIncome)}
        </div>
      </div>

      {/* Total Expense */}
      <div className="summary-card summary-card--expense" id="card-expense">
        <div className="summary-card__label">Total Expense</div>
        <div className="summary-card__value summary-card__value--red">
          {formatCurrency(totalExpense)}
        </div>
      </div>

      {/* Net Balance */}
      <div
        className={`summary-card ${
          balanceIsPositive
            ? "summary-card--balance-positive"
            : "summary-card--balance-negative"
        }`}
        id="card-balance"
      >
        <div className="summary-card__label">Net Balance</div>
        <div
          className={`summary-card__value ${
            balanceIsPositive
              ? "summary-card__value--green"
              : "summary-card__value--red"
          }`}
        >
          {formatCurrency(netBalance)}
        </div>
      </div>

      {/* Top Spending Category */}
      <div className="summary-card summary-card--top" id="card-top-category">
        <div className="summary-card__label">Top Spending Category</div>
        <div className="summary-card__value summary-card__value--accent">
          {topSpendingCategory || "—"}
        </div>
      </div>
    </div>
  );
}

export { CATEGORIES, formatCurrency };
