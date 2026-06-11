import Transaction from "../models/Transaction.js";

/**
 * @desc    Create a new transaction
 * @route   POST /api/transactions
 */
export const createTransaction = async (req, res, next) => {
  try {
    const { amount, category, type, date, note } = req.body;

    // --- Input validation (controller-level) ---
    if (amount === undefined || amount === null) {
      const err = new Error("Amount is required");
      err.statusCode = 400;
      throw err;
    }

    if (typeof amount !== "number" || amount <= 0) {
      const err = new Error("Amount must be a number greater than 0");
      err.statusCode = 400;
      throw err;
    }

    if (!category) {
      const err = new Error("Category is required");
      err.statusCode = 400;
      throw err;
    }

    if (!type) {
      const err = new Error("Type is required");
      err.statusCode = 400;
      throw err;
    }

    if (date !== undefined && date !== null) {
      const parsed = new Date(date);
      if (isNaN(parsed.getTime())) {
        const err = new Error("Invalid date value");
        err.statusCode = 400;
        throw err;
      }
    }

    const transaction = await Transaction.create({
      amount,
      category,
      type,
      date: date || Date.now(),
      note,
    });

    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all transactions with optional filters
 * @route   GET /api/transactions
 * @query   category, startDate, endDate
 */
export const getTransactions = async (req, res, next) => {
  try {
    const { category, startDate, endDate } = req.query;
    const filter = {};

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Date range filter
    if (startDate || endDate) {
      filter.date = {};

      if (startDate) {
        const parsedStart = new Date(startDate);
        if (isNaN(parsedStart.getTime())) {
          const err = new Error("Invalid startDate value");
          err.statusCode = 400;
          throw err;
        }
        filter.date.$gte = parsedStart;
      }

      if (endDate) {
        const parsedEnd = new Date(endDate);
        if (isNaN(parsedEnd.getTime())) {
          const err = new Error("Invalid endDate value");
          err.statusCode = 400;
          throw err;
        }
        filter.date.$lte = parsedEnd;
      }
    }

    const transactions = await Transaction.find(filter).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get financial summary with aggregation
 * @route   GET /api/transactions/summary
 */
export const getSummary = async (req, res, next) => {
  try {
    // Total income
    const incomeResult = await Transaction.aggregate([
      { $match: { type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalIncome = incomeResult.length > 0 ? incomeResult[0].total : 0;

    // Total expense
    const expenseResult = await Transaction.aggregate([
      { $match: { type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalExpense = expenseResult.length > 0 ? expenseResult[0].total : 0;

    // Net balance
    const netBalance = totalIncome - totalExpense;

    // Category breakdown for expenses + top spending category
    const categoryBreakdown = await Transaction.aggregate([
      { $match: { type: "expense" } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
      { $sort: { total: -1 } },
      {
        $project: {
          _id: 0,
          category: "$_id",
          total: 1,
        },
      },
    ]);

    const topSpendingCategory =
      categoryBreakdown.length > 0 ? categoryBreakdown[0].category : null;

    res.status(200).json({
      success: true,
      data: {
        totalIncome,
        totalExpense,
        netBalance,
        topSpendingCategory,
        categoryBreakdown,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a transaction by ID
 * @route   DELETE /api/transactions/:id
 */
export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      const err = new Error(
        `Transaction not found with id ${req.params.id}`
      );
      err.statusCode = 404;
      throw err;
    }

    await Transaction.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
