const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve images
app.use("/meals", express.static(path.join(__dirname, "meals")));

// Read meals.json
app.get("/meals", (req, res) => {
  fs.readFile("meals.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading meals.json" });
    }
    res.json(JSON.parse(data));
  });
});

// Render uses PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
