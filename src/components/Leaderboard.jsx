import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [usersData, setUsersData] = useState({}); // Store user data with userId as key

  const fetchData = async (userId) => {
    try {
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
      console.log("User retrieved successfully:", data);
      setUsersData((prevData) => ({ ...prevData, [userId]: data.user.name }));
    } catch (error) {
      console.error("Error getting user:", error);
      // Handle the error appropriately
    }
  };

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

        const totalExpensesByExpUserId = data.reduce((acc, expense) => {
          const { ExpUserId, moneySpent } = expense;
          fetchData(ExpUserId);
          acc[ExpUserId] = (acc[ExpUserId] || 0) + moneySpent;
          return acc;
        }, {});

        console.log("Total Expenses by ExpUserId:", totalExpensesByExpUserId);

        const generatedData = Object.entries(totalExpensesByExpUserId).map(
          ([ExpUserId, totalExpenses]) => ({
            ExpUserId,
            totalExpenses,
          })
        );

        generatedData.sort((a, b) => b.totalExpenses - a.totalExpenses);

        console.log("Leaderboard Data:", generatedData);

        setLeaderboardData(generatedData);
      })
      .catch((error) => {
        console.error("Error getting expenses:", error);
        // Handle the error appropriately
      });
  }, []);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>User ID</th>
            <th style={styles.tableHeader}>Total Expenses</th>
            <th style={styles.tableHeader}>User Name</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry, index) => (
            <tr key={entry.ExpUserId}>
              <td style={styles.tableCell}>{entry.ExpUserId}</td>
              <td style={styles.tableCell}>{entry.totalExpenses}</td>
              <td style={styles.tableCell}>{usersData[entry.ExpUserId]}</td>
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
