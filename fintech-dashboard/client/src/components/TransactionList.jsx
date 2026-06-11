import { deleteTransaction } from "../api/transactions";

/**
 * Format an ISO date string to "DD MMM YYYY".
 * @param {string} dateStr
 * @returns {string}
 */
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Format amount with ₹ sign.
 * @param {number} amount
 * @returns {string}
 */
function formatAmount(amount) {
  return `₹${Number(amount).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function TransactionList({ transactions, onDelete }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="txn-table-wrap" id="transaction-list">
        <div className="txn-empty">No transactions found.</div>
      </div>
    );
  }

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      if (onDelete) onDelete(id);
    } catch (err) {
      console.error("Failed to delete transaction:", err);
    }
  };

  return (
    <div className="txn-table-wrap" id="transaction-list">
      <table className="txn-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Note</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn._id}>
              <td>{formatDate(txn.date)}</td>
              <td>
                <span className="txn-category-badge">{txn.category}</span>
              </td>
              <td>
                <span
                  className={`txn-type-badge txn-type-badge--${txn.type}`}
                >
                  {txn.type}
                </span>
              </td>
              <td
                className={
                  txn.type === "income"
                    ? "txn-amount--income"
                    : "txn-amount--expense"
                }
              >
                {txn.type === "income" ? "+" : "−"}
                {formatAmount(txn.amount)}
              </td>
              <td>{txn.note || "—"}</td>
              <td>
                <button
                  className="txn-delete-btn"
                  onClick={() => handleDelete(txn._id)}
                  aria-label={`Delete transaction ${txn._id}`}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
