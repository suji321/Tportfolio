// /api/gemini.js
export default async function handler(req, res) {
  // Retrieve your API key from an environment variable
  const API_KEY = process.env.GEMINI_API_KEY;
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'No question provided.' });
  }

  // Send the question to Google’s Generative Language API
  const apiResponse = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: question }] }],
        // Adjust model parameters if needed (temperature, topK, etc.)
      }),
    },
  );

  if (!apiResponse.ok) {
    const text = await apiResponse.text();
    return res.status(apiResponse.status).json({ error: text });
  }

  const data = await apiResponse.json();
  const answer =
    data.candidates?.[0]?.content?.parts?.[0]?.text ??
    'Sorry, I couldn’t think of an answer.';

  // Return a JSON response containing only the answer
  res.status(200).json({ answer });
}
