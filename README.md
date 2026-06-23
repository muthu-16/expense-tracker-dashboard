# 💰 Expense Tracker Dashboard

## Intern Details

| Field | Details |
|---|---|
| **Intern ID** | CITS4794 |
| **Name** | Muthu B |
| **Domain** | Full Stack Development |
| **No. of Weeks** | 4 Weeks |
| **Project Name** | Expense Tracker Dashboard |

## Project Scope

The Expense Tracker Dashboard is a full-stack web application that allows users to track their income and expenses in real time. It provides a clean, interactive dashboard to add transactions, view a complete transaction history, search and filter records by type, export data as a CSV file, and delete entries — with all data persisted in a MongoDB Atlas database through a custom Node.js/Express backend.

The goal of this project was to build a complete CRUD (Create, Read, Update, Delete) application from scratch, connecting a vanilla JavaScript frontend to a RESTful API backend, while applying a modern, visually distinctive UI design.

## Features

- ➕ Add new income or expense transactions with description, amount, and category
- 📊 Live summary cards showing Total Balance, Total Income, and Total Expense
- 📋 Transaction history table with description, amount, category, type, and date
- 🔍 Real-time search to filter transactions by description
- 🧮 Filter transactions by type (All / Income / Expense)
- 📤 Export transaction history as a downloadable CSV file
- ❌ Delete transactions with automatic recalculation of totals
- 💾 Persistent storage using MongoDB Atlas (data survives page refresh)
- 🎨 Holographic-style UI with animated gradients and glassmorphic panels

## Tech Stack

**Frontend**
- HTML5
- CSS3 (custom Holographic UI styling)
- Vanilla JavaScript (DOM manipulation, Fetch API)

**Backend**
- Node.js
- Express.js
- Mongoose

**Database**
- MongoDB Atlas (Cloud)

**Tools**
- Visual Studio Code
- Git & GitHub
- Live Server (VS Code extension)
- Postman (API testing)

## Project Structure

```
Expense-Tracker-Dashboard/
├── backend/
│   ├── models/
│   │   └── Transaction.js      # Mongoose schema for transactions
│   ├── server.js                # Express server and API routes
│   ├── package.json
│   └── .env                     # MongoDB connection string (not committed)
├── index.html                   # Main dashboard page
├── style.css                    # Holographic UI styling
├── script.js                    # Frontend logic (fetch, render, events)
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/transactions` | Fetch all transactions |
| `POST` | `/api/transactions` | Add a new transaction |
| `DELETE` | `/api/transactions/:id` | Delete a transaction by ID |

## How to Run Locally

1. Clone the repository
   ```
   git clone https://github.com/<your-username>/<your-repo-name>.git
   ```

2. Navigate to the backend folder and install dependencies
   ```
   cd Expense-Tracker-Dashboard/backend
   npm install
   ```

3. Create a `.env` file inside the `backend` folder with your MongoDB connection string
   ```
   MONGO_URI=your_mongodb_atlas_connection_string
   PORT=5000
   ```

4. Start the backend server
   ```
   node server.js
   ```

5. Open `index.html` in the project root using the **Live Server** extension in VS Code (or any local web server)

## Screenshots

> Screenshots of the dashboard, add transaction form, transaction history, and database connection should be added here before submission.

```
/screenshots
  ├── dashboard-overview.png
  ├── add-transaction.png
  ├── transaction-history.png
  └── mongodb-atlas-connection.png
```

## Learning Outcomes

- Building a RESTful API with Express and connecting it to MongoDB Atlas
- Performing full CRUD operations from a vanilla JavaScript frontend using the Fetch API
- Handling asynchronous operations and error states gracefully
- Debugging real-world issues such as CORS, execution policy restrictions, and missing API routes
- Applying custom, non-templated UI design (Glassmorphism and Holographic styles) using pure CSS

## Author

**Muthu B**
Intern ID: CITS4794
CODTECH IT Solutions
