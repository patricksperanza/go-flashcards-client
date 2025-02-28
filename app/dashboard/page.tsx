"use client";
import { useState, useEffect } from "react";

interface Deck {
  name: string;
  id: number;
}

const Dashboard = () => {
  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    const getDecks = async () => {
      try {
        const response = await fetch("http://localhost:8000/deck", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        console.log("response: ", response);
        const result = await response.json();
        console.log("result: ", result);
      } catch (error) {
        console.log(error);
      }
    };
    getDecks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
      <h3>Decks</h3>
    </div>
  );
};

export default Dashboard;
