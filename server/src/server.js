const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const menuRoutes = require("./routes/menuRoutes");

const orderRoutes = require("./routes/orderRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/menu", menuRoutes);

app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Rolling Cones Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});