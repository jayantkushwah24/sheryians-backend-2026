import "./src/config/env.config.js";

import dns from "dns";
import app from "./src/app.js";
import databaseConnect from "./src/config/db.config.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const port = process.env.PORT;

await databaseConnect();

app
  .listen(port, "127.0.0.1", () => {
    console.log(`app is listening on the port ${port}`);
  })
  .on("error", (err) => console.log("Server Error: ", err));
