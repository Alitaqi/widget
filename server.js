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

  console.log("🔔 Received submission:", { name, tenantId });

  if (!name || !tenantId) {
    return res.status(400).json({ error: "Name and tenantId are required" });
  }

  submissions.push({
    tenantId,
    name,
    timestamp: new Date().toISOString()
  });

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

// Clear endpoint (for dev use)
app.post("/api/clear", (req, res) => {
  submissions = [];
  console.log("🧹 Submissions cleared.");
  res.json({ message: "All submissions cleared." });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
