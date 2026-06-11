import { useState } from "react";
import { addTransaction } from "../api/transactions";
import { CATEGORIES } from "./SummaryCards";

const today = () => new Date().toISOString().split("T")[0];

const INITIAL_STATE = {
  amount: "",
  category: "",
  type: "expense",
  date: today(),
  note: "",
};

export default function AddTransactionForm({ onSuccess }) {
  const [form, setForm] = useState(INITIAL_STATE);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (error) setError("");
  };

  const validate = () => {
    if (!form.amount || Number(form.amount) <= 0) return "Amount is required and must be positive.";
    if (!form.category) return "Please select a category.";
    if (!form.type) return "Please select income or expense.";
    if (!form.date) return "Date is required.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    try {
      await addTransaction({
        amount: Number(form.amount),
        category: form.category,
        type: form.type,
        date: form.date,
        note: form.note,
      });
      setForm({ ...INITIAL_STATE, date: today() });
      setError("");
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to add transaction."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="add-form" id="add-transaction-form" onSubmit={handleSubmit}>
      <h3 className="add-form__title">Add Transaction</h3>

      {error && <div className="add-form__error" id="form-error">{error}</div>}

      <div className="add-form__grid">
        {/* Amount */}
        <div className="add-form__field">
          <label className="add-form__label" htmlFor="txn-amount">
            Amount (₹)
          </label>
          <input
            id="txn-amount"
            type="number"
            className="add-form__input"
            placeholder="0.00"
            min="0"
            step="0.01"
            value={form.amount}
            onChange={(e) => handleChange("amount", e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="add-form__field">
          <label className="add-form__label" htmlFor="txn-category">
            Category
          </label>
          <select
            id="txn-category"
            className="add-form__select"
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
          >
            <option value="">Select category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div className="add-form__field">
          <label className="add-form__label">Type</label>
          <div className="add-form__radio-group">
            <label className="add-form__radio-label" htmlFor="txn-type-income">
              <input
                id="txn-type-income"
                type="radio"
                name="txnType"
                value="income"
                checked={form.type === "income"}
                onChange={(e) => handleChange("type", e.target.value)}
              />
              Income
            </label>
            <label className="add-form__radio-label" htmlFor="txn-type-expense">
              <input
                id="txn-type-expense"
                type="radio"
                name="txnType"
                value="expense"
                checked={form.type === "expense"}
                onChange={(e) => handleChange("type", e.target.value)}
              />
              Expense
            </label>
          </div>
        </div>

        {/* Date */}
        <div className="add-form__field">
          <label className="add-form__label" htmlFor="txn-date">
            Date
          </label>
          <input
            id="txn-date"
            type="date"
            className="add-form__input"
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
          />
        </div>

        {/* Note */}
        <div className="add-form__field" style={{ gridColumn: "1 / -1" }}>
          <label className="add-form__label" htmlFor="txn-note">
            Note (optional)
          </label>
          <textarea
            id="txn-note"
            className="add-form__textarea"
            placeholder="Add a note…"
            rows={2}
            maxLength={300}
            value={form.note}
            onChange={(e) => handleChange("note", e.target.value)}
          />
        </div>
      </div>

      <div className="add-form__actions">
        <button
          type="submit"
          className="add-form__submit"
          id="btn-add-transaction"
          disabled={submitting}
        >
          {submitting ? "Adding…" : "Add Transaction"}
        </button>
      </div>
    </form>
  );
}
