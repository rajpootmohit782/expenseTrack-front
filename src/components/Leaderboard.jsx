import React, { useEffect, useState } from "react";

const Leaderboard = ({ user }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [Data, setData] = useState();
  console.log(user);

  useEffect(() => {
    fetch(`https://hx28bh-4000.csb.app/expenses/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Expenses retrieved successfully:", data);

        // Calculate total expenses for each ExpUserId
        const totalExpensesByExpUserId = data.reduce((acc, expense) => {
          const { ExpUserId, moneySpent } = expense;
          setData(ExpUserId);
          acc[ExpUserId] = (acc[ExpUserId] || 0) + moneySpent;
          return acc;
        }, {});

        console.log("Total Expenses by ExpUserId:", totalExpensesByExpUserId);

        // Convert totalExpensesByExpUserId into an array of objects
        const generatedData = Object.entries(totalExpensesByExpUserId).map(
          ([ExpUserId, totalExpenses]) => ({
            ExpUserId,
            totalExpenses,
          })
        );

        // Sort the generatedData based on total expenses (descending order)
        generatedData.sort((a, b) => b.totalExpenses - a.totalExpenses);

        console.log("Leaderboard Data:", generatedData);

        setLeaderboardData(generatedData); // Update the leaderboard data state variable
      })
      .catch((error) => {
        console.error("Error getting expenses:", error);
        // Handle the error appropriately
      });
  }, []); // Empty dependency array to run the effect only onc

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>User ID</th>
            <th style={styles.tableHeader}>Total Expenses</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry, index) => (
            <tr key={entry.ExpUserId}>
              <td style={styles.tableCell}>{entry.ExpUserId}</td>
              <td style={styles.tableCell}>{entry.totalExpenses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  tableHeader: {
    backgroundColor: "#f2f2f2",
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  tableCell: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
};

export default Leaderboard;
