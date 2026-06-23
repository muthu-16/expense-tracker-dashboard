console.log("SERVER FILE LOADED - NEW VERSION");
require("dotenv").config();
require("dns").setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Transaction = require("./models/Transaction");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected Successfully");
})
.catch((err) => {
    console.log("❌ ERROR NAME:", err.name);
    console.log("❌ ERROR MESSAGE:", err.message);
});
console.log("Transaction Routes Loaded");

// CREATE a transaction
app.post("/api/transactions", async (req, res) => {
    try {
        const transaction = new Transaction(req.body);
        const savedTransaction = await transaction.save();

        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ all transactions
app.get("/api/transactions", async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE a transaction by ID
app.delete("/api/transactions/:id", async (req, res) => {
    try {
        const deleted = await Transaction.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.json({ message: "Transaction deleted successfully", deleted });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while deleting transaction" });
    }
});

// Test Routes
app.get("/test", (req, res) => {
    res.send("TEST WORKING");
});

app.get("/hello", (req, res) => {
    res.send("HELLO");
});

app.get("/test123", (req, res) => {
    res.send("TEST123");
});

// Root Route
app.get("/", (req, res) => {
    res.send("🚀 Expense Tracker Backend is Running");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});