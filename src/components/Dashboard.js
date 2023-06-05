import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./dashboard.css";
import Payment from "./Payment";
import PremiumMembershipCheck from "./PremiumUser";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [expensedata, setExpenseData] = useState();
  const [xuserId, setUserId] = useState("");
  const [moneySpent, setMoneySpent] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [formNeed, setFormNeed] = useState(false);
  const [salaryForm, setSalaryForm] = useState(false);
  const [user, setUser] = useState({}); // Replace 'John Doe' with the actual user name
  const [totalSalary, setTotalSalary] = useState(0); // Replace 0 with the actual total salary
  const [totalExpenses, setTotalExpenses] = useState(0); // Replace 0 with the actual total expenses
  const [salary, setSalary] = useState(0);
  // Retrieve the user ID from the route parameters
  const { userId } = useParams();
  console.log(userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Update the user ID state
        setUserId(userId);
        const response = await fetch(
          `https://hx28bh-4000.csb.app/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log("User retrieved successfully:", data.user.name);
        // Perform any further actions with the user
        setUser(data.user);
      } catch (error) {
        console.error("Error getting user:", error);
        // Handle the error appropriately
      }
    };

    fetchData(); // Call the async function immediately

    return () => {
      // Perform any necessary clean-up here
    };
  }, []);

  useEffect(() => {
    fetch(`https://hx28bh-4000.csb.app/expenses/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Expenses retrieved successfully:", data);
        setExpenseData(data);
        let total = 0;
        for (let i = 0; i < data.length; i++) {
          total = total + data[i].moneySpent;
          console.log(data[i]);
        }
        console.log(total);
        setTotalExpenses(total);
        setExpenses(data); // Update the expenses state variable
      })
      .catch((error) => {
        console.error("Error getting expenses:", error);
        // Handle the error appropriately
      });
  }, []);

  useEffect(() => {
    fetch(`https://hx28bh-4000.csb.app/salary/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json()) // Add return statement here
      .then((data) => {
        console.log("salary retrieved successfully:", data);
        // Perform any further actions with the salary data
        console.log(data);
        setSalary(data[data.length - 1].amount);
      })
      .catch((error) => {
        console.error("Error getting salary:", error);
        // Handle the error appropriately
      });
  }, []);

  console.log(xuserId);

  const handleMoneySpentChange = (event) => {
    setMoneySpent(event.target.value);
  };

  const handleExpenseDescriptionChange = (event) => {
    setExpenseDescription(event.target.value);
  };

  const handleExpenseCategoryChange = (event) => {
    setExpenseCategory(event.target.value);
  };

  const handleTotalSalaryChange = (event) => {
    setTotalSalary(event.target.value);
  };
  const handleSubmitSalary = (event) => {
    event.preventDefault();

    // Check if the required field is empty
    if (!totalSalary) {
      alert("Please enter the salary amount.");
      return;
    }

    // Create an object with the salary data
    const salaryData = {
      amount: totalSalary,
    };

    fetch("https://hx28bh-4000.csb.app/salary/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        id: userId,
      },
      body: JSON.stringify(salaryData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Salary added successfully:", data);
        // Perform any further actions after adding the salary
      })
      .catch((error) => {
        console.error("Error adding salary:", error);
        // Handle the error appropriately
      });

    // Clear the form field
    // setSalaryAmount("");
  };

  const handleSubmitExpense = (event) => {
    event.preventDefault();

    // Check if any required fields are empty
    if (!moneySpent || !expenseDescription || !expenseCategory) {
      alert("Please fill in all the required fields.");
      return;
    }

    // Create an object with the expense data
    const mexpenseData = {
      moneySpent,
      expenseDescription,
      expenseCategory,
    };

    fetch("https://hx28bh-4000.csb.app/expenses/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        id: userId,
      },
      body: JSON.stringify(mexpenseData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Expense added successfully:", data);
        // Perform any further actions after adding the expense
      })
      .catch((error) => {
        console.error("Error adding expense:", error);
        // Handle the error appropriately
      });

    // Clear the form fields
    setMoneySpent("");
    setExpenseDescription("");
    setExpenseCategory("");
    window.location.reload();
  };

  const handleDisplayForm = () => {
    setFormNeed(!formNeed);
  };

  const handleDelete = (expenseId) => {
    fetch(`https://hx28bh-4000.csb.app/expenses/delete/${expenseId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Expense deleted successfully:", data);
        // Update the expenses state by removing the deleted expense
        setExpenses((prevExpenses) =>
          prevExpenses.filter((expense) => expense.id !== expenseId)
        );
        // Reload the page
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting expense:", error);
        // Handle the error appropriately
      });
  };

  return (
    <div className={`dashboard ${darkMode ? "dark-mode" : ""}`}>
      <h1>Expense Tracker</h1>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <PremiumMembershipCheck userId={user} />
      <div className="dashboard-info">
        <p>Date: {new Date().toLocaleDateString()}</p>
        <p>Time: {new Date().toLocaleTimeString()}</p>
        <p>User: {user.name}</p>
        <p>
          Total Salary: Rs. {salary}
          <button onClick={() => setSalaryForm(!salaryForm)}>
            Edit Salary
          </button>
        </p>
        {salaryForm && (
          <form className="salary-form" onSubmit={handleSubmitSalary}>
            <div>
              <label htmlFor="totalSalary">Total Salary Update:</label>
              <input
                type="number"
                id="totalSalary"
                value={totalSalary}
                onChange={handleTotalSalaryChange}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        )}
        <p>Total Expenses: {totalExpenses}</p>
        <button className="add-form-btn" onClick={handleDisplayForm}>
          Add Total Salary/Expenses
        </button>
      </div>
      {formNeed && (
        <form className="expense-form" onSubmit={handleSubmitExpense}>
          <div>
            <label htmlFor="moneySpent">Money Spent:</label>
            <input
              type="text"
              id="moneySpent"
              value={moneySpent}
              onChange={handleMoneySpentChange}
            />
          </div>
          <div>
            <label htmlFor="expenseDescription">Expense Description:</label>
            <input
              type="text"
              id="expenseDescription"
              value={expenseDescription}
              onChange={handleExpenseDescriptionChange}
            />
          </div>
          <div>
            <label htmlFor="expenseCategory">Expense Category:</label>
            <select
              id="expenseCategory"
              value={expenseCategory}
              onChange={handleExpenseCategoryChange}
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Study">Study</option>
              <option value="Travel">Travel</option>
              <option value="Others">Others</option>
              {/* Add more categories as needed */}
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
      <h2>Expense DATA</h2>
      <div className="expense-data-container">
        {expenses !== undefined &&
          expenses.map((data) => (
            <div className="expense-data-item" key={data.id}>
              <h3>{data.expenseCategory}</h3>
              <h3>{data.expenseDescription}</h3>
              <h3>{data.moneySpent}</h3>
              <button onClick={() => handleDelete(data.id)}>Delete</button>
            </div>
          ))}
      </div>
      <h2 className="money-left">Money Left = {salary - totalExpenses}</h2>
      <Payment user={user} />
    </div>
  );
};

export default Dashboard;
