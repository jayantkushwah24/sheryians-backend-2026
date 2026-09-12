import app from "./app/app.js";
import { connectDatabase } from "./config/db.js";

await connectDatabase();

app
  .listen(3000, "127.0.0.1", () => {
    console.log("app is listening on the port 3000");
  })
  .on("error", (err) => {
    console.log("error in connecting to server: ", err);
  });
