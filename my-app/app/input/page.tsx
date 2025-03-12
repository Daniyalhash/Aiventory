'use client';
import { useState } from "react";

export default function InputPage() {
  const [formData, setFormData] = useState({ name: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await saveData(formData);
    console.log(result); // Check if data is saved
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      <button type="submit">Save</button>
    </form>
  );
}
