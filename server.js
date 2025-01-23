require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const routes = require("./routes");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.APP_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("testing");
});
app.use("/api", routes);
app.listen(PORT, () => {
  console.log(`Courses APP Listening on port: ${PORT}`);
});
