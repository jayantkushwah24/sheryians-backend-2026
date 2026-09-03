import "./src/config/env.config.js";
import dns from "dns";
import app from "./src/app.js";
import { connectDatabase } from "./src/config/db.config.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);
const port = 3000;
connectDatabase();

app
  .listen(port, "127.0.0.1", () => {
    console.log(`app is listening on the port ${port}`);
  })
  .on("error", (err) => console.log("SERVER ERROR: ", err));
