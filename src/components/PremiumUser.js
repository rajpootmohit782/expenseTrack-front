import React, { useEffect, useState } from "react";
import Leaderboard from "./Leaderboard";
const PremiumMembershipCheck = ({ userId }) => {
  const [isPremiumMember, setIsPremiumMember] = useState(false);

  useEffect(() => {
    const checkPremiumMembership = async () => {
      try {
        // Set the request options
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };

        // Make an API request to check if the user is a premium member
        const response = await fetch(
          "https://hx28bh-4000.csb.app/api/premiumUsers",
          requestOptions
        );
        const premiumUsers = await response.json();
        console.log(premiumUsers);
        // Check if the user's ID is present in the premiumUsers array
        // Replace with the actual user ID
        const nestedObjects = Object.values(premiumUsers);
        const isUserPremium = nestedObjects.some(
          (obj) => obj.ExpuserId === userId.id
        );
        console.log("nnn", nestedObjects);
        console.log(isUserPremium);

        setIsPremiumMember(isUserPremium);
      } catch (error) {
        console.error(error);
      }
    };

    checkPremiumMembership();
  });

  return (
    <div>
      {isPremiumMember ? (
        <div>
          <p style={{ color: "green" }}> {userId.name} is a premium member</p>
          <Leaderboard user={userId} />
        </div>
      ) : (
        <p> {userId.name} is not a premium member</p>
      )}
    </div>
  );
};

export default PremiumMembershipCheck;
