// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;
let submissions = [];

app.use(cors());
app.use(bodyParser.json());

// POST /api/submit – Receives name + tenantId from widget
app.post("/api/submit", (req, res) => {
  const { name, tenantId } = req.body;

  if (!name || !tenantId) {
    return res.status(400).json({ error: "Name and tenantId are required" });
  }

  const entry = {
    tenantId,
    name,
    timestamp: new Date().toISOString()
  };

  submissions.push(entry);
  console.log("✅ New submission:", entry);

  res.json({ message: "Submission received" });
});

// GET /api/data – View all or filtered by tenantId
app.get("/api/data", (req, res) => {
  const { tenantId } = req.query;

  if (tenantId) {
    const filtered = submissions.filter(entry => entry.tenantId === tenantId);
    return res.json(filtered);
  }

  res.json(submissions);
});

// POST /api/clear – Clear all submissions (for dev/testing)
app.post("/api/clear", (req, res) => {
  submissions = [];
  console.log("🧹 All submissions cleared.");
  res.json({ message: "All submissions cleared." });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
