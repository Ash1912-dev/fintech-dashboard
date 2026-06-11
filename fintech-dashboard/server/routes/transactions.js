import express from "express";
import {
  createTransaction,
  getTransactions,
  getSummary,
  deleteTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

// GET /api/transactions/summary — must be before /:id to avoid conflict
router.get("/summary", getSummary);

// POST   /api/transactions
router.post("/", createTransaction);

// GET    /api/transactions
router.get("/", getTransactions);

// DELETE /api/transactions/:id
router.delete("/:id", deleteTransaction);

export default router;
