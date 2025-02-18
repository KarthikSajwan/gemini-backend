// server.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = require("./src/app");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/gemini", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Failed to connect to MongoDB:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
);
