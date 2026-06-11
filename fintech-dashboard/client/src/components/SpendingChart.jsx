import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CHART_COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#a78bfa",
  "#818cf8",
  "#7c3aed",
  "#6d28d9",
  "#5b21b6",
  "#4f46e5",
  "#4338ca",
];

/**
 * Custom tooltip for the bar chart.
 */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "0.65rem 0.85rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        fontFamily: "Inter, sans-serif",
        fontSize: "0.85rem",
      }}
    >
      <p style={{ fontWeight: 600, marginBottom: 2 }}>{label}</p>
      <p style={{ color: "#6366f1" }}>
        ₹{Number(payload[0].value).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
      </p>
    </div>
  );
}

export default function SpendingChart({ categoryBreakdown }) {
  if (!categoryBreakdown || categoryBreakdown.length === 0) {
    return (
      <div className="chart-container" id="spending-chart">
        <h3 className="chart-container__title">Spending by Category</h3>
        <div className="chart-container__empty">
          📊 No spending data available yet. Start adding transactions!
        </div>
      </div>
    );
  }

  const data = categoryBreakdown.map((item) => ({
    category: item._id || item.category,
    amount: item.total || item.amount || 0,
  }));

  return (
    <div className="chart-container" id="spending-chart">
      <h3 className="chart-container__title">Spending by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="category"
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={{ stroke: "#e2e8f0" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={{ stroke: "#e2e8f0" }}
            tickLine={false}
            tickFormatter={(v) => `₹${v.toLocaleString("en-IN")}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="amount" radius={[6, 6, 0, 0]} barSize={48}>
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={CHART_COLORS[index % CHART_COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
