const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;
let submissions = [];

app.use(cors());
app.use(bodyParser.json());

// POST /api/submit
app.post("/api/submit", (req, res) => {
  const { name, tenantId } = req.body;

  console.log("📥 Received submission:", req.body);

  if (!name || !tenantId) {
    return res.status(400).json({ error: "Name and tenantId are required" });
  }

  submissions.push({
    tenantId,
    name,
    timestamp: new Date().toISOString(),
  });

  res.json({ message: "Submission received" });
});

// GET /api/data
app.get("/api/data", (req, res) => {
  const { tenantId } = req.query;

  if (tenantId) {
    const filtered = submissions.filter(entry => entry.tenantId === tenantId);
    return res.json(filtered);
  }

  res.json(submissions);
});

// Clear all data (dev only)
app.post("/api/clear", (req, res) => {
  submissions = [];
  res.json({ message: "Cleared all submissions." });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
