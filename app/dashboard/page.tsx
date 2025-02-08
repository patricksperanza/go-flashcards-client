"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Deck {
  name: string;
  id: number;
}

const Dashboard: React.FC = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getDecks = async () => {
      try {
        const res = await fetch("http://localhost:8000/deck", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to retrieve decks");
        }
        const result = await res.json();
        console.log("result: ", result);
        setDecks(result);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err);
          setError(err.message);
        } else {
          console.error(err);
        }
      }
    };

    getDecks();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!decks) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
      <h3>Decks</h3>
      <ul>
        {decks.map((deck) => {
          return (
            <li key={deck.id}>
              <Link href={`/deck/${deck.id}`}>{deck.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dashboard;
