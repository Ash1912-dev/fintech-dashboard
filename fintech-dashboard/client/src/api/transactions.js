import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

/**
 * Fetch transactions with optional filters.
 * @param {{ category?: string, startDate?: string, endDate?: string }} params
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const getTransactions = (params = {}) => {
  const query = {};
  if (params.category) query.category = params.category;
  if (params.startDate) query.startDate = params.startDate;
  if (params.endDate) query.endDate = params.endDate;
  return API.get("/transactions", { params: query });
};

/**
 * Fetch summary data (totals + category breakdown).
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const getSummary = () => {
  return API.get("/transactions/summary");
};

/**
 * Create a new transaction.
 * @param {{ amount: number, category: string, type: string, date: string, note?: string }} data
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const addTransaction = (data) => {
  return API.post("/transactions", data);
};

/**
 * Delete a transaction by ID.
 * @param {string} id
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const deleteTransaction = (id) => {
  return API.delete(`/transactions/${id}`);
};
