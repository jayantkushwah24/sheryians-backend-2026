import app from "./app.js";
import connectDB from "./config/db.js";

await connectDB();

app
  .listen(3000, () => {
    console.log("Server is running on port 3000");
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
  });
