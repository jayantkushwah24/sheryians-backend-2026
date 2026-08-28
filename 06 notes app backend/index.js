require("dotenv").config();
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = require("./src/app.js");

const port = process.env.PORT || 3000;

const server = app.listen(port, "127.0.0.1", () => {
  console.log(`SERVER LISTENING ON http://127.0.0.1:${port}`);
});

server.on("error", (err) => {
  console.error("SERVER ERROR:", err);
});
