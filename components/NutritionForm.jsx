import { useState } from "react";

export default function NutritionForm() {
  const [form, setForm] = useState({
    alter: "", groesse: "", gewicht: "", aktivitaet: "", allergien: "",
    jahreszeit: "", mahlzeiten: "", dauer: "", ziel: "", ernährung: ""
  });
  const [antwort, setAntwort] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const prompt = Object.entries(form).map(([k,v]) => `${k}: ${v}`).join(", ");
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    setAntwort(data.result || data.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(form).map((key) => (
        <div key={key}>
          <input name={key} placeholder={key} onChange={handleChange} />
        </div>
      ))}
      <button type="submit">Ernährungsplan generieren</button>
      <pre>{antwort}</pre>
    </form>
  );
}