import app from "./app/app.js";
import connectDatabase from "./config/db.js";

await connectDatabase();

app
  .listen(3000, () => {
    console.log("server is running on the port 3000");
  })
  .on("error", (err) => {
    console.log("error in running server: ", err);
  });
