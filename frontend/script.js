// Get Elements
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const type = document.getElementById("type");
const category = document.getElementById("category");

const addBtn = document.getElementById("add-btn");
const transactionList = document.getElementById("transaction-list");

// Variables
let totalIncome = 0;
let totalExpense = 0;

// Helper: remove the "No Transactions Found" placeholder row if present
function removeEmptyRow() {
    const emptyRow = document.getElementById("empty-row");
    if (emptyRow) {
        emptyRow.remove();
    }
}

// Helper: create a transaction <tr> and wire up its delete button
function createTransactionRow(id, description, value, categoryValue, transactionType, dateText) {

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${description}</td>
        <td>₹${value}</td>
        <td>${categoryValue || "N/A"}</td>
        <td>${transactionType}</td>
        <td>${dateText}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;

    // Delete row (removes from UI, updates totals, and deletes from backend)
    row.querySelector(".delete-btn").addEventListener("click", function () {

        fetch(`http://localhost:5000/api/transactions/${id}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(() => {

            if (transactionType === "income") {
                totalIncome -= value;
            } else {
                totalExpense -= value;
            }

            income.textContent = "₹" + totalIncome;
            expense.textContent = "₹" + totalExpense;
            balance.textContent = "₹" + (totalIncome - totalExpense);

            row.remove();

            // If no rows are left, show the empty state again
            if (transactionList.children.length === 0) {
                const emptyRow = document.createElement("tr");
                emptyRow.id = "empty-row";
                emptyRow.innerHTML = `<td colspan="6">No Transactions Found</td>`;
                transactionList.appendChild(emptyRow);
            }
        })
        .catch(error => {
            console.error("Error deleting transaction:", error);
        });
    });

    return row;
}

// Add Transaction
addBtn.addEventListener("click", function () {

    const description = text.value.trim();
    const value = Number(amount.value);
    const transactionType = type.value;
    const categoryValue = category.value;

    if (description === "" || value <= 0) {
        alert("Please fill all fields correctly!");
        return;
    }

    const transactionData = {
        description: description,
        amount: value,
        type: transactionType,
        category: categoryValue
    };

    fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(transactionData)
    })
    .then(response => response.json())
    .then(data => {

        console.log("Saved:", data);

        // Update totals
        if (transactionType === "income") {
            totalIncome += value;
        } else {
            totalExpense += value;
        }

        // Update cards
        income.textContent = "₹" + totalIncome;
        expense.textContent = "₹" + totalExpense;
        balance.textContent = "₹" + (totalIncome - totalExpense);

        // Remove "No Transactions Found" placeholder if present
        removeEmptyRow();

        const today = new Date().toLocaleDateString("en-gb");

        // Use the real _id returned from the backend so delete works correctly
        const row = createTransactionRow(
            data._id,
            description,
            value,
            categoryValue,
            transactionType,
            today
        );

        transactionList.appendChild(row);
    })
    .catch(error => {
        console.error("Error:", error);
    });

    // Clear inputs
    text.value = "";
    amount.value = "";
});

// Search Function
const search = document.getElementById("search");

search.addEventListener("keyup", function () {

    const filterValue = search.value.toLowerCase();
    const rows = transactionList.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {

        const firstCell = rows[i].getElementsByTagName("td")[0];

        if (firstCell) {

            const textValue = firstCell.textContent.toLowerCase();

            if (textValue.indexOf(filterValue) > -1) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
});

// Filter by type
const filter = document.getElementById("filter");

filter.addEventListener("change", function () {

    const rows = transactionList.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {

        const cells = rows[i].getElementsByTagName("td");

        if (cells.length > 0) {

            const typeText = cells[3].textContent.toLowerCase();

            if (filter.value === "all") {
                rows[i].style.display = "";
            } else if (typeText === filter.value) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
});

// Export CSV
const exportBtn = document.getElementById("export-btn");

exportBtn.addEventListener("click", function () {

    let csv = "Description,Amount,Category,Type,Date\n";

    const rows = transactionList.querySelectorAll("tr");

    rows.forEach(row => {

        const cols = row.querySelectorAll("td");

        if (cols.length > 1) {

            csv +=
                cols[0].innerText + "," +
                cols[1].innerText + "," +
                cols[2].innerText + "," +
                cols[3].innerText + "," +
                cols[4].innerText + "\n";
        }
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "expense_tracker.csv";
    link.click();
});

// Load transactions from backend on page load
async function loadTransactions() {

    try {

        const response = await fetch("http://localhost:5000/api/transactions");
        const transactions = await response.json();

        console.log(transactions);

        if (!transactions || transactions.length === 0) {
            // Nothing to load — leave the existing "No Transactions Found" row as is
            return;
        }

        // Remove "No Transactions Found" placeholder before rendering real rows
        removeEmptyRow();

        transactions.forEach(transaction => {

            const date = new Date(transaction.date).toLocaleDateString("en-GB");

            // Update running totals from loaded data too, so cards are correct on refresh
            if (transaction.type === "income") {
                totalIncome += transaction.amount;
            } else {
                totalExpense += transaction.amount;
            }

            const row = createTransactionRow(
                transaction._id,
                transaction.description,
                transaction.amount,
                transaction.category,
                transaction.type,
                date
            );

            transactionList.appendChild(row);
        });

        // Refresh the summary cards after totals are computed
        income.textContent = "₹" + totalIncome;
        expense.textContent = "₹" + totalExpense;
        balance.textContent = "₹" + (totalIncome - totalExpense);

    } catch (error) {
        console.error("Error loading transactions:", error);
    }
}

loadTransactions();