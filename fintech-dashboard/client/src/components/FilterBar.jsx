import { CATEGORIES } from "./SummaryCards";

export default function FilterBar({ filters, onFilterChange }) {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="filter-bar" id="filter-bar">
      <div className="filter-bar__group">
        <label className="filter-bar__label" htmlFor="filter-category">
          Category
        </label>
        <select
          id="filter-category"
          className="filter-bar__select"
          value={filters.category || ""}
          onChange={(e) => handleChange("category", e.target.value)}
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-bar__group">
        <label className="filter-bar__label" htmlFor="filter-start-date">
          Start Date
        </label>
        <input
          id="filter-start-date"
          type="date"
          className="filter-bar__input"
          value={filters.startDate || ""}
          onChange={(e) => handleChange("startDate", e.target.value)}
        />
      </div>

      <div className="filter-bar__group">
        <label className="filter-bar__label" htmlFor="filter-end-date">
          End Date
        </label>
        <input
          id="filter-end-date"
          type="date"
          className="filter-bar__input"
          value={filters.endDate || ""}
          onChange={(e) => handleChange("endDate", e.target.value)}
        />
      </div>
    </div>
  );
}
