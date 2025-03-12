'use client';
import { useEffect, useState } from "react";
// import { getData } from "@/utils/api";

export default function DisplayPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const data = await getData();
      setItems(data); // Setting fetched items in state
    };
    fetchItems();
  }, []);

  return (
    <div>
      <h1>Saved Items</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.name}: {item.description}</li>
        ))}
      </ul>
    </div>
  );
}
