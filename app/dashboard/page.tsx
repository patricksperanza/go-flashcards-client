"use client";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/authContext";

interface Deck {
  name: string;
  id: number;
}

const Dashboard = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getDecks = async () => {
      try {
        const result = await fetch("http://localhost:8000/deck", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const response = await result.json();
        console.log("response= ", response);
        if (!response.IsOK) {
          console.log("error: ", response.Message);
          return;
        }
        setDecks([...response.Payload]);
      } catch (error) {
        console.log(error);
      }
    };
    getDecks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {currentUser?.first_name}!
      </h1>
      <h3>Decks</h3>
      <ul>
        {decks ? decks.map((deck) => <li key={deck.id}>{deck.name}</li>) : null}
      </ul>
    </div>
  );
};

export default Dashboard;
