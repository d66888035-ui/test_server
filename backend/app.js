import express from "express";
import crypto from "crypto";
import { exec } from "child_process";

const app = express();
const PORT = 3000;
const SECRET = "mysecret123";

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Raspberry Pi 🚀" });
});

app.post("/webhook", express.raw({ type: "*/*" }), (req, res) => {
  const signature = req.get("X-Hub-Signature-256");

  if (!signature) {
    return res.status(401).send("No signature");
  }

  const hmac = crypto.createHmac("sha256", SECRET);
  const digest = "sha256=" + hmac.update(req.body).digest("hex");

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))) {
    return res.status(403).send("Invalid signature");
  }

  res.send("OK");

  exec("bash /home/apisit/test_server/deploy.sh", (err, stdout, stderr) => {
    if (err) {
      console.error("Deploy error:", err);
      return;
    }
    console.log(stdout);
    if (stderr) console.error(stderr);
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
