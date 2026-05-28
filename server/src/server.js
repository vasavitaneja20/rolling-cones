const express = require("express");
const cors = require("cors");
require("dotenv").config();

const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectDB = require("./config/db");

const menuRoutes = require("./routes/menuRoutes");

const orderRoutes = require("./routes/orderRoutes");

const authRoutes = require("./routes/authRoutes");

const app = express();

const http = require("http");

const { Server } = require("socket.io");

connectDB();


app.use(cors());
app.use(express.json());

app.use("/api/menu", menuRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Rolling Cones Backend Running");
});

const PORT = process.env.PORT || 5000;


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});


// STORE IO INSTANCE
app.set("io", io);


io.on("connection", (socket) => {

  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

});


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});