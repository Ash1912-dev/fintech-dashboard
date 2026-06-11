import { useState, useEffect, useCallback } from "react";
import { getTransactions } from "../api/transactions";
import FilterBar from "../components/FilterBar";
import AddTransactionForm from "../components/AddTransactionForm";
import TransactionList from "../components/TransactionList";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTransactions = useCallback(async (currentFilters) => {
    try {
      setLoading(true);
      setError("");
      const res = await getTransactions(currentFilters);
      setTransactions(res.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load transactions."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  /* Fetch on mount */
  useEffect(() => {
    fetchTransactions(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Re-fetch when filters change */
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchTransactions(newFilters);
  };

  /* Re-fetch after successful add */
  const handleAddSuccess = () => {
    fetchTransactions(filters);
  };

  /* Remove deleted transaction from local state and re-fetch */
  const handleDelete = (deletedId) => {
    setTransactions((prev) => prev.filter((t) => t._id !== deletedId));
  };

  return (
    <div className="page" id="transactions-page">
      <h1 className="page__title">Transactions</h1>

      <AddTransactionForm onSuccess={handleAddSuccess} />

      <FilterBar filters={filters} onFilterChange={handleFilterChange} />

      {error && (
        <div className="error-message" id="transactions-error">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading-wrap">
          <div className="spinner" />
        </div>
      ) : (
        <TransactionList transactions={transactions} onDelete={handleDelete} />
      )}
    </div>
  );
}
