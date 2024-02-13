const express = require("express");
const app = express();

// Middleware to set CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Adjust the value as needed
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Proxy route to fetch webpage content
app.get("/fetch", async (req, res) => {
  const websiteUrl = req.query.url;

  try {
    // Use dynamic import for importing node-fetch
    const fetch = await import("node-fetch");
    const response = await fetch.default(websiteUrl);
    const html = await response.text();
    res.send(html);
  } catch (error) {
    console.error("Error fetching webpage:", error);
    res.status(500).send("Error fetching webpage");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
