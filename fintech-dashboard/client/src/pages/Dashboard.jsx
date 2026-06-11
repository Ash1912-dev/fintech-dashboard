import { useState, useEffect } from "react";
import { getSummary } from "../api/transactions";
import SummaryCards from "../components/SummaryCards";
import SpendingChart from "../components/SpendingChart";
import InsightBox from "../components/InsightBox";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchSummary = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await getSummary();
        if (!cancelled) {
          setSummary(res.data.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Failed to load dashboard data."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchSummary();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="page">
        <h1 className="page__title">Dashboard</h1>
        <div className="loading-wrap">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <h1 className="page__title">Dashboard</h1>
        <div className="error-message" id="dashboard-error">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="page" id="dashboard-page">
      <h1 className="page__title">Dashboard</h1>
      <SummaryCards summary={summary} />
      <div className="dashboard-grid">
        <div className="dashboard-grid--full">
          <SpendingChart categoryBreakdown={summary?.categoryBreakdown} />
        </div>
        <div className="dashboard-grid--full">
          <InsightBox summary={summary} />
        </div>
      </div>
    </div>
  );
}
