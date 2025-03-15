export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API-Key nicht gesetzt. Bitte überprüfe .env.local oder Vercel-Settings." });
  }

  const prompt = req.body.prompt;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json({ result: data.choices[0].message.content });
    } else {
      res.status(response.status).json({ error: data.error.message });
    }
  } catch (error) {
    res.status(500).json({ error: "Fehler bei der Anfrage: " + error.message });
  }
}
