const express = require("express");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db/db");
const { authMiddleWare } = require("./middlewares/auth/auth");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

// initializing database
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(require("./routes/auth"));

app.use("/api", authMiddleWare, require("./routes/protected"));

app.use("/stream", require("./routes/streaming"));

const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`),
);

// Handling Error
process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});
