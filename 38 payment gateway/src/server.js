import app from "./app/app.js";
import connectDB from "./config/db.js";

await connectDB();

app
  .listen(3000, "127.0.0.1", () => {
    console.log("server is listening on port 3000");
  })
  .on("error", (err) => {
    console.log(err);
  });
