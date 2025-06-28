const fetch = require("node-fetch");
require("dotenv").config();

async function listAvailableModels() {
  const url =
    "https://generativelanguage.googleapis.com/v1/models?key=" +
    process.env.GEMINI_API_KEY;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  console.log("✅ Available Models:");
  console.log(JSON.stringify(data, null, 2));
}

listAvailableModels();
