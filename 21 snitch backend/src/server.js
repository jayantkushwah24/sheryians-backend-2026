import app from "./app/app.js";
import connectDatabase from "./config/db.js";
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

await connectDatabase();

app
  .listen(3000, "127.0.0.1", () => {
    console.log("server is running on the port 3000");
  })
  .on("error", (err) => {
    console.log("error in running server: ", err);
  });
