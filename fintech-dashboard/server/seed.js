import mongoose from "mongoose";
import dotenv from "dotenv";
import Transaction from "./models/Transaction.js";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/fintech-dashboard";

const sampleTransactions = [
  // ---- Income transactions ----
  {
    amount: 5200,
    category: "Salary",
    type: "income",
    date: new Date("2025-06-01"),
    note: "June monthly salary from TechCorp",
  },
  {
    amount: 850,
    category: "Freelance",
    type: "income",
    date: new Date("2025-06-05"),
    note: "Logo design project for local bakery",
  },
  {
    amount: 320,
    category: "Investment",
    type: "income",
    date: new Date("2025-06-10"),
    note: "Quarterly dividend from index fund portfolio",
  },
  {
    amount: 1500,
    category: "Freelance",
    type: "income",
    date: new Date("2025-06-15"),
    note: "Website redesign for a consulting firm",
  },
  {
    amount: 200,
    category: "Other",
    type: "income",
    date: new Date("2025-06-18"),
    note: "Sold old furniture on marketplace",
  },

  // ---- Expense transactions ----
  {
    amount: 85.5,
    category: "Food",
    type: "expense",
    date: new Date("2025-06-02"),
    note: "Weekly groceries from Whole Foods",
  },
  {
    amount: 45,
    category: "Transport",
    type: "expense",
    date: new Date("2025-06-03"),
    note: "Uber rides to downtown office",
  },
  {
    amount: 249.99,
    category: "Shopping",
    type: "expense",
    date: new Date("2025-06-04"),
    note: "New running shoes from Nike outlet",
  },
  {
    amount: 120,
    category: "Health",
    type: "expense",
    date: new Date("2025-06-07"),
    note: "Dental checkup and cleaning",
  },
  {
    amount: 15.99,
    category: "Entertainment",
    type: "expense",
    date: new Date("2025-06-08"),
    note: "Netflix monthly subscription",
  },
  {
    amount: 62.3,
    category: "Food",
    type: "expense",
    date: new Date("2025-06-12"),
    note: "Dinner at Italian restaurant with friends",
  },
  {
    amount: 35,
    category: "Transport",
    type: "expense",
    date: new Date("2025-06-14"),
    note: "Monthly metro pass top-up",
  },
  {
    amount: 499,
    category: "Shopping",
    type: "expense",
    date: new Date("2025-06-16"),
    note: "Mechanical keyboard for home office",
  },
  {
    amount: 29.99,
    category: "Entertainment",
    type: "expense",
    date: new Date("2025-06-20"),
    note: "Concert tickets for weekend show",
  },
  {
    amount: 78,
    category: "Health",
    type: "expense",
    date: new Date("2025-06-22"),
    note: "Pharmacy — vitamins and supplements",
  },
];

const seed = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected for seeding");

    // Clear existing transactions
    await Transaction.deleteMany({});
    console.log("🗑️  Cleared existing transactions");

    // Insert sample data
    const inserted = await Transaction.insertMany(sampleTransactions);
    console.log(`🌱 Seeded ${inserted.length} transactions successfully`);

    await mongoose.disconnect();
    console.log("📦 Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seed();
