import React, { useState, useEffect } from "react";
import "./filterDashboard.css";
const FilterDashboard = ({ userId }) => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [filter, setFilter] = useState("daily");
  const [totalExpensesMonth, setTotalExpensesMonth] = useState(0);
  const [totalExpensesYear, setTotalExpensesYear] = useState(0);
  const [totalExpensesWeek, setTotalExpensesWeek] = useState(0);

  const [month, setMonth] = useState();
  const [year, setyear] = useState();

  useEffect(() => {
    fetchExpenses(userId);
    fetchIncomes(userId);
  }, []);

  const fetchIncomes = (userId) => {
    fetch(`https://hx28bh-4000.csb.app/salary/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Salary retrieved successfully:", data);
        setIncomes(data);
      })
      .catch((error) => {
        console.error("Error getting salary:", error);
      });
  };

  const fetchExpenses = (userId) => {
    fetch(`https://hx28bh-4000.csb.app/expenses/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Expenses retrieved successfully:", data);
        setExpenses(data);
        let totalMonth = 0;
        let totalYear = 0;
        let totalWeek = 0;
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentWeekStart = new Date(
          currentDate.setDate(currentDate.getDate() - currentDate.getDay())
        );

        for (let i = 0; i < data.length; i++) {
          const expenseDate = new Date(data[i].createdAt);
          const expenseYear = expenseDate.getFullYear();
          const expenseMonth = expenseDate.getMonth();
          setMonth(expenseMonth);
          setyear(expenseYear);
          const expenseWeekStart = new Date(
            expenseDate.setDate(expenseDate.getDate() - expenseDate.getDay())
          );

          if (expenseMonth === currentMonth && expenseYear === currentYear) {
            totalMonth += data[i].moneySpent;
          }

          if (expenseYear === currentYear) {
            totalYear += data[i].moneySpent;
          }

          if (expenseWeekStart.getTime() === currentWeekStart.getTime()) {
            totalWeek += data[i].moneySpent;
          }
        }

        setTotalExpensesMonth(totalMonth);
        setTotalExpensesYear(totalYear);
        setTotalExpensesWeek(totalWeek);
      })
      .catch((error) => {
        console.error("Error getting expenses:", error);
      });
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filterData = (data, filter) => {
    const currentDate = new Date().toISOString().split("T")[0];
    const currentMonth = new Date()
      .toISOString()
      .split("-")
      .slice(0, 2)
      .join("-");
    const currentYear = new Date().getFullYear();

    switch (filter) {
      case "daily":
        return data.filter((item) => item.createdAt.startsWith(currentDate));
      case "weekly":
        return data.filter((item) => {
          const itemDate = new Date(item.createdAt);
          const startDate = new Date();
          startDate.setDate(startDate.getDate() - startDate.getDay());
          const endDate = new Date(startDate);
          endDate.setDate(endDate.getDate() + 6);
          return itemDate >= startDate && itemDate <= endDate;
        });
      case "monthly":
        return data.filter((item) => item.createdAt.startsWith(currentMonth));
      case "yearly":
        return data.filter((item) => item.createdAt.startsWith(currentYear));
      default:
        return data;
    }
  };

  const filteredExpenses = filterData(expenses, filter);
  const filteredIncomes = filterData(incomes, filter);

  // Inside the downloadExpenses function in preview-protocol.js
  function downloadExpenses(userId) {
    fetch(`https://hx28bh-4000.csb.app/expenses/${userId}`)
      .then((response) => response.json())
      .then((expenses) => {
        try {
          const expensesBlob = new Blob([JSON.stringify(expenses)], {
            type: "application/json",
          });
          const expensesUrl = URL.createObjectURL(expensesBlob);
          const link = document.createElement("a");
          console.log("expensesUrl", expensesUrl);
          link.href = expensesUrl;
          link.download = "expenses.json";
          link.click();
          URL.revokeObjectURL(expensesUrl);
        } catch (error) {
          console.error("Error downloading expenses:", error);
          // Provide a fallback option for downloading expenses
          const downloadLink = document.createElement("a");
          downloadLink.href = `https://hx28bh-4000.csb.app/download/${userId}`; // Modify the URL to match your server-side route
          downloadLink.target = "_blank";
          downloadLink.click();
        }
      })
      .catch((error) => {
        console.error("Error retrieving expenses:", error);
      });
  }

  return (
    <div>
      <h1>Filter Dashboard</h1>

      <h2>Expenses</h2>
      <select value={filter} onChange={handleFilterChange}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
      <div>{("month:" + month, "year:" + year)}</div>
      <div>{"month:" + month}</div>

      <ul>
        {filteredExpenses &&
          filteredExpenses.map((expense) => (
            <li key={expense.id}>
              <p>Category: {expense.expenseCategory}</p>
              <p>Description: {expense.expenseDescription}</p>
              <p>Money Spent: {expense.moneySpent}</p>
              <p>Created At: {expense.createdAt}</p>
            </li>
          ))}
      </ul>
      <h3>Total Expenses</h3>
      <p>Month: {totalExpensesMonth}</p>
      <p>Year: {totalExpensesYear}</p>
      <p>Week: {totalExpensesWeek}</p>

      <h2>Incomes</h2>
      <ul>
        {filteredIncomes &&
          filteredIncomes.map((income) => (
            <li key={income.id}>
              <p>Amount: {income.amount}</p>
              <p>Created At: {income.createdAt}</p>
            </li>
          ))}
      </ul>
      <button onClick={downloadExpenses}>Download Expenses</button>
    </div>
  );
};

export default FilterDashboard;
