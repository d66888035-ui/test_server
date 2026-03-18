import express from "express";

const app = express();
const API_URL = "http://192.168.178.79:3000";

app.get("/", (req, res) => {
  res.send("Hello from Raspberry Pi 🚀");
});

app.listen(3000, "0.0.0.0", () => {
  console.log(`Server running on ${API_URL}`);
});
