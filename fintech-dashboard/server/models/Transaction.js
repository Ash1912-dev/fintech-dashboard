import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount must be a positive number"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: [
          "Food",
          "Transport",
          "Shopping",
          "Health",
          "Entertainment",
          "Salary",
          "Freelance",
          "Investment",
          "Other",
        ],
        message: "{VALUE} is not a valid category",
      },
    },
    type: {
      type: String,
      required: [true, "Type is required"],
      enum: {
        values: ["income", "expense"],
        message: "{VALUE} is not a valid type. Must be 'income' or 'expense'",
      },
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now,
    },
    note: {
      type: String,
      maxlength: [300, "Note cannot exceed 300 characters"],
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
