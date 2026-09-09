import app from "./app/app.js";
import connectDatabase from "./config/db.config.js";
import config from "./config/env.config.js";
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const port = config.PORT || 3000;

await connectDatabase();

app
  .listen(port, "127.0.0.1", () => {
    console.log(`app is listening on the port ${port}`);
  })
  .on("error", (err) => {
    console.error("Error in connecting to server", err);
  });
