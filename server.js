// server.js
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

// GET /api/data
app.get("/api/data", (req, res) => {
  res.json(submissions);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
