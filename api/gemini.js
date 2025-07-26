// API route for proxying requests to Google’s Generative Language API (Gemini).
//
// This serverless function is intended to run on Vercel or another platform
// that supports Node.js APIs. It securely forwards the user's question to
// Gemini using an API key stored in an environment variable. The key must be
// defined as `GEMINI_API_KEY` in your project’s environment settings on
// Vercel.



export default async function handler(req, res) {
  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Verify the API key is present
    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
      return res.status(500).json({ error: 'Gemini API key is not configured.' });
    }

    // Parse the incoming request body.  req.body may be undefined in the
    // Node.js environment; if so, read the stream manually.
    let body = req.body;
    if (!body) {
      const buffers = [];
      for await (const chunk of req) {
        buffers.push(chunk);
      }
      const raw = Buffer.concat(buffers).toString();
      try {
        body = JSON.parse(raw);
      } catch (err) {
        return res.status(400).json({ error: 'Invalid JSON in request body.' });
      }
    }

    const question = body.question;
    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'No question provided.' });
    }

    // Prepare the payload for Gemini API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;
    const geminiPayload = {
      contents: [{ parts: [{ text: question }] }],
    };

    // Send the request to Gemini API
    const apiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiPayload),
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      return res.status(apiResponse.status).json({ error: errorText });
    }

    const data = await apiResponse.json();
    const answer =
      data.candidates?.[0]?.content?.parts?.[0]?.text ??
      'Sorry, I could not generate an answer.';

    return res.status(200).json({ answer });
  } catch (err) {
    console.error('Error in /api/gemini:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}