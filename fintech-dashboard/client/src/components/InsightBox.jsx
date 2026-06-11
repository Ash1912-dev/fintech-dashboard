export default function InsightBox({ summary }) {
  if (!summary) return null;

  const {
    totalIncome = 0,
    totalExpense = 0,
    netBalance = 0,
    topSpendingCategory = "",
    categoryBreakdown = [],
  } = summary;

  let icon = "";
  let message = "";

  // Rule 1: Spending exceeds income
  if (totalExpense > totalIncome) {
    icon = "⚠️";
    message = "⚠ You're spending more than you earn this period.";
  }
  // Rule 2: Food > 30% of income
  else if (topSpendingCategory === "Food") {
    const foodEntry = categoryBreakdown.find(
      (c) => (c._id || c.category) === "Food"
    );
    const foodTotal = foodEntry ? foodEntry.total || foodEntry.amount || 0 : 0;
    if (foodTotal > totalIncome * 0.3) {
      icon = "🍔";
      message = "🍔 Food accounts for over 30% of your income.";
    } else {
      // Fall through to rule 3
      icon = "";
      message = "";
    }
  }

  // Rule 3: Saving over 20%
  if (!message && netBalance > 0 && netBalance > totalIncome * 0.2) {
    icon = "✅";
    message = "✅ Great job! You're saving over 20% of your income.";
  }

  // Rule 4: Default
  if (!message) {
    icon = "📊";
    message = "📊 Keep logging transactions for better insights.";
  }

  return (
    <div className="insight-box" id="insight-box">
      <div className="insight-box__icon">{icon}</div>
      <p className="insight-box__message">{message}</p>
    </div>
  );
}
